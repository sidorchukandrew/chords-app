import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  deleteBinder,
  getBinderById,
  removeSongFromBinder,
} from '../services/bindersService';

import AddSongsToBinderBottomSheet from '../components/AddSongsToBinderBottomSheet';
import BinderDetailHeader from '../components/BinderDetailHeader';
import BinderOptionsBottomSheet from '../components/BinderOptionsBottomSheet';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import Container from '../components/Container';
import {EDIT_BINDERS} from '../utils/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemSeparator from '../components/ItemSeparator';
import KeyBadge from '../components/KeyBadge';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import SwipeListDeleteButton from '../components/SwipeListDeleteButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import {hasAnyKeysSet} from '../utils/song';
import {reportError} from '../utils/error';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function BinderDetailScreen({navigation, route}) {
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [addSongsSheetVisible, setAddSongsSheetVisible] = useState(false);
  const [binder, setBinder] = useState(route.params);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const currentMember = useSelector(selectCurrentMember);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) setBinder(route.params);
    }, [route]),
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getBinderById(route.params.id);
        setBinder(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [route.params.id]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {currentMember.can(EDIT_BINDERS) && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setAddSongsSheetVisible(true)}>
              <Icon name="plus" size={22} color="#2464eb" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setOptionsSheetVisible(true)}>
            <Icon name="dots-horizontal" size={22} color="#2464eb" />
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation, currentMember]);

  function renderRow({item: song}) {
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={() => handleNavigateToSong(song)}
        underlayColor="white">
        <>
          <Text style={styles.songName}>{song.name}</Text>
          {hasAnyKeysSet(song) && (
            <KeyBadge style={styles.keyBadge}>
              {song.transposed_key || song.original_key}
            </KeyBadge>
          )}
        </>
      </TouchableHighlight>
    );
  }

  function handleNavigateTo(routeName) {
    navigation.navigate(routeName, binder);
  }

  function handleNavigateToSong(song) {
    navigation.navigate('Song Detail', song);
  }

  function filteredSongs() {
    let lowercasedQuery = query.toLowerCase();
    return binder?.songs?.filter(song =>
      song.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  function renderNoData() {
    if (loading) {
      return <LoadingIndicator />;
    } else if (query && filteredSongs().length === 0) {
      return <Text>No songs were found</Text>;
    } else {
      return (
        <NoDataMessage
          buttonTitle="Add songs"
          onButtonPress={() => setAddSongsSheetVisible(true)}
          message="There are no songs in this binder yet"
          showAddButton={currentMember.can(EDIT_BINDERS)}
        />
      );
    }
  }

  function handleSongsAdded(songsAdded) {
    setBinder(currentBinder => ({
      ...currentBinder,
      songs: [...currentBinder.songs, ...songsAdded],
    }));
  }

  async function handleConfirmDelete() {
    try {
      setDeleting(true);
      await deleteBinder(binder.id);
      navigation.navigate('Binders', {deleted: binder});
    } catch (error) {
      reportError(error);
    }
  }

  async function handleRemoveSong(songIdToRemove) {
    setBinder(currentBinder => {
      let updatedSongs = currentBinder.songs?.filter(
        song => song.id !== songIdToRemove,
      );
      return {...currentBinder, songs: updatedSongs};
    });

    try {
      await removeSongFromBinder(binder.id, songIdToRemove);
    } catch (error) {
      reportError(error);
    }
  }

  function renderHiddenItem({item: song}) {
    return (
      <View style={styles.hiddenRow}>
        <SwipeListDeleteButton onPress={() => handleRemoveSong(song.id)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Container size="lg">
        <SwipeListView
          data={filteredSongs()}
          renderItem={renderRow}
          ListHeaderComponent={
            <BinderDetailHeader
              binder={binder}
              query={query}
              onQueryChange={setQuery}
            />
          }
          ListEmptyComponent={renderNoData}
          renderHiddenItem={
            currentMember.can(EDIT_BINDERS) ? renderHiddenItem : null
          }
          ItemSeparatorComponent={ItemSeparator}
          style={{height: '100%'}}
          rightOpenValue={-75}
          stopRightSwipe={-100}
          disableRightSwipe
        />
      </Container>
      <AddSongsToBinderBottomSheet
        visible={addSongsSheetVisible}
        onDismiss={() => setAddSongsSheetVisible(false)}
        selectedSongIds={binder?.songs?.map(song => song.id)}
        binderId={binder?.id}
        onSongsAdded={handleSongsAdded}
      />
      <BinderOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
        onDelete={() => setConfirmDeleteVisible(true)}
        onNavigateTo={handleNavigateTo}
      />
      <ConfirmDeleteModal
        visible={confirmDeleteVisible}
        deleting={deleting}
        onDelete={handleConfirmDelete}
        onDismiss={() => setConfirmDeleteVisible(false)}
        message="Are you sure you'd like to delete this binder? Deleting this binder will not delete any songs from your library."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerButton: {
    backgroundColor: '#eaeaea',
    padding: 3,
    borderRadius: 50,
    marginLeft: 15,
  },
  songName: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  keyBadge: {
    marginLeft: 10,
  },
  hiddenRow: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
