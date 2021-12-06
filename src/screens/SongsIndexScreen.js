import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CircleButton from '../components/CircleButton';
import KeyBadge from '../components/KeyBadge';
import List from '../components/List';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../components/Input';

export default function SongsIndexScreen({navigation}) {
  const [query, setQuery] = useState('');

  function renderLargeScreen({item: song}) {
    return (
      <Pressable style={styles.row} onPress={() => handleNavigateTo(song.id)}>
        <Text style={styles.name}>{song.name}</Text>
        <KeyBadge style={styles.keyBadge}>{song.songKey}</KeyBadge>
      </Pressable>
    );
  }

  function renderSmallScreen({item: song}) {
    return <Text style={styles.name}>{song.name}</Text>;
  }

  function filteredSongs() {
    const lowercasedQuery = query.toLowerCase();
    return songs.filter(song =>
      song.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  function handleNavigateTo(songId) {
    navigation.navigate('Song Detail', {id: songId});
  }

  function handleCreateSong() {
    console.log('creating');
    navigation.navigate('Create Song');
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search your songs"
        style={styles.searchInput}
        onChange={setQuery}
        value={query}
      />
      <List
        items={filteredSongs()}
        renderLargeScreen={renderLargeScreen}
        renderSmallScreen={renderSmallScreen}
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
    paddingHorizontal: 10,
  },
  searchInput: {
    marginTop: 20,
    marginBottom: 15,
  },
  name: {
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
];
