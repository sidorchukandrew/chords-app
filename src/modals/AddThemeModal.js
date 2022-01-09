import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addGenresToSong, addThemesToSong} from '../services/songsService';

import AddThemeHeader from '../components/AddThemeHeader';
import Checkbox from '../components/Checkbox';
import Container from '../components/Container';
import CreateThemeBottomSheet from '../components/CreateThemeBottomSheet';
import ItemSeparator from '../components/ItemSeparator';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import {getAllThemes} from '../services/themesService';
import {reportError} from '../utils/error';

export default function AddThemeModal({navigation, route}) {
  const [themes, setThemes] = useState([]);
  const [song] = useState(route.params);
  const [selectedThemeIds, setSelectedThemeIds] = useState([]);
  const [saving, setSaving] = useState(false);
  const [createThemeSheetVisible, setCreateThemeSheetVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let {data: allThemes} = await getAllThemes();
        let previouslySelectedThemes = new Set();
        song.themes?.forEach(theme => previouslySelectedThemes.add(theme.id));
        let unselectedThemes = allThemes.filter(
          theme => !previouslySelectedThemes.has(theme.id),
        );

        setThemes(unselectedThemes);
      } catch (error) {
        reportError(error);
      }
    }

    fetchData();
  }, []);

  function handleToggle(checked, theme) {
    if (checked) {
      setSelectedThemeIds(currentIds => currentIds.concat(theme.id));
    } else {
      setSelectedThemeIds(currentIds =>
        currentIds.filter(id => id !== theme.id),
      );
    }
  }

  function renderRow({item: theme}) {
    return (
      <Checkbox
        text={theme.name}
        checked={selectedThemeIds.includes(theme.id)}
        style={styles.row}
        onPress={checked => handleToggle(checked, theme)}
      />
    );
  }

  async function handleSave() {
    try {
      setSaving(true);
      await addThemesToSong(selectedThemeIds, song.id);
      console.log('here');
      navigation.goBack();
    } catch (error) {
      setSaving(false);
      reportError(error);
    }
  }

  function handleThemeCreated(theme) {
    setThemes(currentThemes => [theme, ...currentThemes]);
  }

  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Add Theme"
        onBackPress={navigation.goBack}
        onSavePress={handleSave}
        saveDisabled={selectedThemeIds.length === 0}
        saving={saving}
      />
      <Container>
        <FlatList
          data={themes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderRow}
          ListHeaderComponent={
            <AddThemeHeader
              onCreatePress={() => setCreateThemeSheetVisible(true)}
            />
          }
        />
      </Container>
      <CreateThemeBottomSheet
        visible={createThemeSheetVisible}
        onDismiss={() => setCreateThemeSheetVisible(false)}
        onCreated={handleThemeCreated}
      />
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
});
