import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ADD_SONGS} from '../utils/auth';
import CircleButton from '../components/CircleButton';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemSeparator from '../components/ItemSeparator';
import KeyBadge from '../components/KeyBadge';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import SearchFilterBar from '../components/SearchFilterBar';
import {getAllSetlists} from '../services/setlistsService';
import {getAllSongs} from '../services/songsService';
import {hasAnyKeysSet} from '../utils/song';
import {reportError} from '../utils/error';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function SongsIndexScreen({navigation}) {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const currentMember = useSelector(selectCurrentMember);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          setLoading(true);
          let data = await getAllSongs();
          setSongs(data);
        } catch (error) {
          reportError(error);
        } finally {
          setLoading(false);
        }
      }

      console.log('Fetching data');
      fetchData();
    }, []),
  );

  async function handleRefresh() {
    try {
      setRefreshing(true);
      let data = await getAllSongs({refresh: true});
      setSongs(data);
    } catch (error) {
      reportError(error);
    } finally {
      setRefreshing(false);
    }
  }

  function renderSongRow({item: song}) {
    return (
      <Container size="lg">
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleNavigateTo(song)}>
          <Text style={styles.name}>{song.name}</Text>
          {hasAnyKeysSet(song) && (
            <KeyBadge style={styles.keyBadge}>
              {song.transposed_key || song.original_key}
            </KeyBadge>
          )}
        </TouchableOpacity>
      </Container>
    );
  }

  function filteredSongs() {
    const lowercasedQuery = query.toLowerCase();
    return songs.filter(song =>
      song.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  function handleNavigateTo({id, name}) {
    navigation.navigate('Song Detail', {id, name});
  }

  function handleCreateSong() {
    navigation.navigate('Create Song');
  }

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <SearchFilterBar
            query={query}
            onQueryChange={setQuery}
            placeholder={`Search ${songs?.length} songs`}
          />
        }
        data={filteredSongs()}
        renderItem={renderSongRow}
        ListEmptyComponent={
          <NoDataMessage
            message="You have no songs in your library yet"
            showAddButton={currentMember.can(ADD_SONGS)}
            buttonTitle="Add songs"
            onButtonPress={handleCreateSong}
          />
        }
      />
      {currentMember.can(ADD_SONGS) && (
        <CircleButton style={styles.addButton} onPress={handleCreateSong}>
          <Icon name="plus" size={35} color="white" />
        </CircleButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
