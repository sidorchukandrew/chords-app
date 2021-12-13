import React, {useState} from 'react';
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

export default function SongsIndexScreen({navigation}) {
  const [query, setQuery] = useState('');

  function renderSongRow({item: song}) {
    return (
      <Container size="lg">
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleNavigateTo(song)}>
          <Text style={styles.name}>{song.name}</Text>
          <KeyBadge style={styles.keyBadge}>{song.songKey}</KeyBadge>
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

const songs = [
  {id: 1, name: 'How Great is Our God', songKey: 'A'},
  {id: 2, name: 'How Great Thou Art', songKey: 'Db'},
  {id: 3, name: 'Amazing Grace', songKey: 'E'},
  {id: 4, name: 'This is Amazing Grace', songKey: 'D'},
  {id: 5, name: 'What a Day', songKey: 'G'},
  {id: 6, name: 'Here Again', songKey: 'C'},
  {id: 7, name: 'How Great is Our God', songKey: 'A'},
  {id: 8, name: 'How Great Thou Art', songKey: 'Db'},
  {id: 9, name: 'Amazing Grace', songKey: 'E'},
  {id: 10, name: 'This is Amazing Grace', songKey: 'D'},
  {id: 11, name: 'What a Day', songKey: 'G'},
  // {id: 12, name: 'Here Again', songKey: 'C'},
  // {id: 13, name: 'How Great is Our God', songKey: 'A'},
  // {id: 14, name: 'How Great Thou Art', songKey: 'Db'},
  // {id: 15, name: 'Amazing Grace', songKey: 'E'},
  // {id: 41, name: 'This is Amazing Grace', songKey: 'D'},
  {id: 51, name: 'What a Day', songKey: 'G'},
  {id: 61, name: 'Here Again', songKey: 'C'},
];
