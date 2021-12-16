import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CircleButton from '../components/CircleButton';
import KeyBadge from '../components/KeyBadge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../components/Container';
import SearchFilterBar from '../components/SearchFilterBar';
import {reportError} from '../utils/error';
import {getAllSongs} from '../services/songsService';

import LoadingIndicator from '../components/LoadingIndicator';
import {hasAnyKeysSet} from '../utils/song';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {ADD_SONGS} from '../utils/auth';
import NoDataMessage from '../components/NoDataMessage';

export default function SongsIndexScreen({navigation, route}) {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const currentMember = useSelector(selectCurrentMember);

  useEffect(() => {
    if (route?.params?.created) {
      setSongs(currentSongs => [...currentSongs, route.params.created]);
      navigation.navigate('Song Detail', route.params.created);
    }
  }, [route?.params?.created, navigation]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getAllSongs();
        setSongs(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleRefresh() {
    try {
      setRefreshing(true);
      let {data} = await getAllSongs();
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
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
