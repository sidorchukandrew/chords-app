import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CircleButton from '../components/CircleButton';
import KeyBadge from '../components/KeyBadge';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../components/Container';
import SearchFilterBar from '../components/SearchFilterBar';
import {reportError} from '../utils/error';
import {getAllSongs} from '../services/songsService';

import LoadingIndicator from '../components/LoadingIndicator';
import {hasAnyKeysSet} from '../utils/song';

export default function SongsIndexScreen({navigation}) {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

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
        ListHeaderComponent={
          <SearchFilterBar
            query={query}
            onQueryChange={setQuery}
            placeholder={`Search ${songs?.length} songs`}
          />
        }
        data={filteredSongs()}
        renderItem={renderSongRow}
      />
      <CircleButton style={styles.addButton} onPress={handleCreateSong}>
        <Icon name="plus" size={35} color="white" />
      </CircleButton>
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
