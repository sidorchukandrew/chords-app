import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import Checkbox from '../components/Checkbox';
import Container from '../components/Container';
import ItemSeparator from '../components/ItemSeparator';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import {addGenresToSong} from '../services/songsService';
import {getAllGenres} from '../services/genresService';
import {reportError} from '../utils/error';

export default function AddGenreModal({navigation, route}) {
  const [genres, setGenres] = useState([]);
  const [song] = useState(route.params);
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let {data: allGenres} = await getAllGenres();
        let previouslySelectedGenres = new Set();
        song.genres?.forEach(genre => previouslySelectedGenres.add(genre.id));
        let unselectedGenres = allGenres.filter(
          genre => !previouslySelectedGenres.has(genre.id),
        );

        setGenres(unselectedGenres);
      } catch (error) {
        reportError(error);
      }
    }

    fetchData();
  }, []);

  function handleToggle(checked, genre) {
    if (checked) {
      setSelectedGenreIds(currentIds => currentIds.concat(genre.id));
    } else {
      setSelectedGenreIds(currentIds =>
        currentIds.filter(id => id !== genre.id),
      );
    }
  }

  function renderRow({item: genre}) {
    return (
      <Checkbox
        text={genre.name}
        checked={selectedGenreIds.includes(genre.id)}
        style={styles.row}
        onPress={checked => handleToggle(checked, genre)}
      />
    );
  }

  async function handleSave() {
    try {
      setSaving(true);
      await addGenresToSong(selectedGenreIds, song.id);
      navigation.goBack();
    } catch (error) {
      setSaving(false);
      reportError(error);
    }
  }

  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Add Genre"
        onBackPress={navigation.goBack}
        onSavePress={handleSave}
        saveDisabled={selectedGenreIds.length === 0}
        saving={saving}
      />
      <Container style={styles.container}>
        <FlatList
          data={genres}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderRow}
          style={styles.list}
        />
      </Container>
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  list: {
    marginBottom: 20,
  },
});
