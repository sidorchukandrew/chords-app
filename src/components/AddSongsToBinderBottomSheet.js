import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {reportError} from '../utils/error';
import BottomSheet from './BottomSheet';
import SearchInput from './SearchInput';
import {getAllSongs} from '../services/songsService';
import NoDataMessage from './NoDataMessage';
import {hasAnyKeysSet} from '../utils/song';
import KeyBadge from './KeyBadge';
import Checkbox from './Checkbox';
import ItemSeparator from './ItemSeparator';
import Button from './Button';
import {pluralize} from '../utils/string';
import {addSongsToBinder} from '../services/bindersService';

export default function AddSongsToBinderBottomSheet({
  visible,
  onDismiss,
  selectedSongIds,
  binderId,
  onSongsAdded,
}) {
  const sheetRef = useRef();
  const [unboundSongs, setUnboundSongs] = useState([]);
  const [songsToAdd, setSongsToAdd] = useState([]);
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
    else {
      setSongsToAdd([]);
    }
  }, [visible, sheetRef]);

  useEffect(() => {
    async function fetchData() {
      try {
        let {data} = await getAllSongs();
        let unbound = data.filter(song => !selectedSongIds.includes(song.id));

        setUnboundSongs(unbound);
      } catch (error) {
        reportError(error);
      }
    }

    fetchData();
  }, [selectedSongIds]);

  function handleToggleSong(isChecked, song) {
    if (isChecked) {
      setSongsToAdd(currentSongs => [...currentSongs, song]);
    } else {
      setSongsToAdd(currentSongs =>
        currentSongs.filter(checkedSong => checkedSong.id !== song.id),
      );
    }
  }

  function renderSongRow({item: song}) {
    return (
      <View>
        <Checkbox
          checked={isSelectedToBeAdded(song)}
          onPress={isChecked => handleToggleSong(isChecked, song)}
          style={styles.checkbox}
          text={
            <View style={styles.row}>
              <Text style={styles.name}>{song.name}</Text>
              {hasAnyKeysSet(song) && (
                <KeyBadge style={styles.keyBadge}>
                  {song.transposed_key || song.original_key}
                </KeyBadge>
              )}
            </View>
          }
        />
      </View>
    );
  }

  function isSelectedToBeAdded(song) {
    return songsToAdd.find(songToAdd => songToAdd.id === song.id);
  }

  function filteredSongs() {
    let lowercasedQuery = query.toLowerCase();
    return unboundSongs.filter(song =>
      song.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  async function handleSave() {
    try {
      setSaving(true);
      let songIds = songsToAdd.map(song => song.id);
      let {data} = await addSongsToBinder(binderId, songIds);
      onSongsAdded(data);
      onDismiss();
    } catch (error) {
      reportError(error);
      setSaving(false);
    }
  }

  return (
    <BottomSheet onDismiss={onDismiss} ref={sheetRef} snapPoints={['90%']}>
      <View style={styles.container}>
        <Text style={styles.title}>Songs in your library</Text>
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={
            <NoDataMessage
              showAddButton={false}
              message="There are no songs in your library"
            />
          }
          ListHeaderComponent={
            <View style={styles.searchContainer}>
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder={`Search ${unboundSongs.length} songs`}
              />
            </View>
          }
          data={filteredSongs()}
          renderItem={renderSongRow}
          style={styles.listContainer}
        />
        <Button
          disabled={songsToAdd.length === 0}
          loading={saving}
          onPress={handleSave}>
          Add {songsToAdd.length} {pluralize(songsToAdd, 'song')}
        </Button>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  searchContainer: {
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    marginBottom: 15,
  },
  name: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  keyBadge: {
    marginLeft: 10,
  },
  checkbox: {
    marginLeft: 4,
  },
  listContainer: {
    flex: 1,
  },
});
