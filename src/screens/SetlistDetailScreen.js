import React, {useEffect, useRef, useState} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  deleteSetlist,
  getSetlistById,
  removeSongFromSetlist,
  updateScheduledSong,
} from '../services/setlistsService';

import AddSongsToSetlistBottomSheet from '../components/AddSongsToSetlistBottomSheet';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import Container from '../components/Container';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {EDIT_SETLISTS} from '../utils/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemSeparator from '../components/ItemSeparator';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import SetlistDetailHeader from '../components/SetlistDetailHeader';
import SetlistOptionsBottomSheet from '../components/SetlistOptionsBottomSheet';
import SetlistSongRowItem from '../components/SetlistSongRowItem';
import {reportError} from '../utils/error';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function SetlistDetailScreen({route, navigation}) {
  const [setlist, setSetlist] = useState(route.params);
  const [addSongsSheetVisible, setAddSongsSheetVisible] = useState(false);
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const itemRefs = useRef(new Map());
  const currentMember = useSelector(selectCurrentMember);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          setLoading(true);
          let data = await getSetlistById(route.params.id);
          setSetlist(data);
        } catch (error) {
          reportError(error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, [route.params.id]),
  );

  async function handleRefresh() {
    try {
      setRefreshing(true);
      let data = await getSetlistById(route.params.id, {refresh: true});
      setSetlist(data);
    } catch (error) {
      reportError(error);
    } finally {
      setRefreshing(false);
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setAddSongsSheetVisible(true)}>
            <Icon name="plus" size={22} color="#2464eb" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setOptionsSheetVisible(true)}>
            <Icon name="dots-horizontal" size={22} color="#2464eb" />
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation]);

  function renderSongRow(params) {
    return (
      <SetlistSongRowItem
        {...params}
        itemRefs={itemRefs}
        onNavigateToSong={handleNavigateToSong}
        onRemove={handleRemoveSong}
        editable={currentMember.can(EDIT_SETLISTS)}
      />
    );
  }

  function handleReorder({data: reorderedSongs, from, to}) {
    reorderedSongs = reorderedSongs.map((reorderedSong, index) => ({
      ...reorderedSong,
      position: index,
    }));

    let movedSong = setlist.songs[from];

    setSetlist(currentSetlist => ({...currentSetlist, songs: reorderedSongs}));
    updateScheduledSong(setlist.id, movedSong.id, to, reorderedSongs);
  }

  function handleNavigateToSong(song) {
    navigation.navigate('Song Detail', song);
  }

  function handleNavigateTo(routeName) {
    navigation.navigate(routeName, setlist);
  }

  function handleSongsAdded(songsAdded) {
    setSetlist(currentSetlist => ({
      ...currentSetlist,
      songs: [...currentSetlist.songs, ...songsAdded],
    }));
  }

  function renderNoData() {
    if (loading) return <LoadingIndicator />;
    else {
      return (
        <NoDataMessage
          buttonTitle="Add songs"
          message="No songs in this set yet"
          onButtonPress={() => setAddSongsSheetVisible(true)}
          showAddButton
        />
      );
    }
  }

  async function handleRemoveSong(songIdToRemove) {
    setSetlist(currentSetlist => {
      let updatedSongs = currentSetlist.songs.filter(
        song => song.id !== songIdToRemove,
      );
      return {...currentSetlist, songs: updatedSongs};
    });

    try {
      await removeSongFromSetlist(setlist.id, songIdToRemove);
    } catch (error) {
      reportError(error);
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true);
      await deleteSetlist(setlist.id);
      navigation.navigate('Sets', {deleted: setlist});
    } catch (error) {
      setDeleting(false);
      reportError(error);
    }
  }

  return (
    <View style={styles.container}>
      <Container size="lg">
        <DraggableFlatList
          activationDistance={20}
          data={setlist.songs}
          keyExtractor={(item, index) => item.id}
          renderItem={renderSongRow}
          ListHeaderComponent={
            <SetlistDetailHeader
              setlist={setlist}
              onNavigateTo={handleNavigateTo}
            />
          }
          ListEmptyComponent={renderNoData()}
          ItemSeparatorComponent={ItemSeparator}
          refreshControl={
            <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
          }
          onDragEnd={handleReorder}
        />
      </Container>
      <AddSongsToSetlistBottomSheet
        visible={addSongsSheetVisible}
        onDismiss={() => setAddSongsSheetVisible(false)}
        onSongsAdded={handleSongsAdded}
        setlistId={setlist.id}
      />
      <SetlistOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
        onDelete={() => setConfirmDeleteVisible(true)}
        onNavigateTo={handleNavigateTo}
      />
      <ConfirmDeleteModal
        visible={confirmDeleteVisible}
        onDismiss={() => setConfirmDeleteVisible(false)}
        onDelete={handleDelete}
        deleting={deleting}
        message="Are you sure you'd like to delete this set? Deleting this set will not delete any songs from your library."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  headerButton: {
    backgroundColor: '#eaeaea',
    padding: 3,
    borderRadius: 50,
    marginLeft: 15,
  },
  hiddenRow: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
