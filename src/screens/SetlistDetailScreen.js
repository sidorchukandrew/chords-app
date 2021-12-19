import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AddSongsToSetlistBottomSheet from '../components/AddSongsToSetlistBottomSheet';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemSeparator from '../components/ItemSeparator';
import KeyBadge from '../components/KeyBadge';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import SetlistDetailHeader from '../components/SetlistDetailHeader';
import SetlistOptionsBottomSheet from '../components/SetlistOptionsBottomSheet';
import {getSetlistById} from '../services/setlistsService';
import {hasAnyKeysSet} from '../utils/song';
import {reportError} from '../utils/error';

export default function SetlistDetailScreen({route, navigation}) {
  const [setlist, setSetlist] = useState(route.params);
  const [addSongsSheetVisible, setAddSongsSheetVisible] = useState(false);
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getSetlistById(route.params.id);
        setSetlist(data);
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

  function renderSongRow({item: song}) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => handleNavigateToSong(song)}>
        <Text style={styles.songName}>{song.name}</Text>
        {hasAnyKeysSet(song) && (
          <KeyBadge style={styles.keyBadge}>
            {song.transposed_key || song.original_key}
          </KeyBadge>
        )}
      </TouchableOpacity>
    );
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

  return (
    <View style={styles.container}>
      <Container size="lg">
        <FlatList
          style={{height: '100%'}}
          data={setlist.songs}
          renderItem={renderSongRow}
          ListHeaderComponent={
            <SetlistDetailHeader
              setlist={setlist}
              onNavigateTo={handleNavigateTo}
            />
          }
          ListEmptyComponent={renderNoData()}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item, index) => index}
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  keyBadge: {
    marginLeft: 10,
  },
});
