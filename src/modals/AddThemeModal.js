import {FlatList, StyleSheet, View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {addThemesToSong} from '../services/songsService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from '../components/Checkbox';
import Container from '../components/Container';
import CreateThemeBottomSheet from '../components/CreateThemeBottomSheet';
import ItemSeparator from '../components/ItemSeparator';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import {getAllThemes} from '../services/themesService';
import {reportError} from '../utils/error';
import {useTheme} from '../hooks/useTheme';
import CircleButton from '../components/CircleButton';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';

export default function AddThemeModal({navigation, route}) {
  const [themes, setThemes] = useState([]);
  const [song] = useState(route.params);
  const [selectedThemeIds, setSelectedThemeIds] = useState([]);
  const [saving, setSaving] = useState(false);
  const [createThemeSheetVisible, setCreateThemeSheetVisible] = useState(false);
  const {text} = useTheme();

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

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setAvoidOffset(100);
    AvoidSoftInput.setHideAnimationDelay(100);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setDefaultAppSoftInputMode();
      AvoidSoftInput.setAvoidOffset(0); // Default value
    };
  }, []);

  useFocusEffect(onFocusEffect);

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
        checked={selectedThemeIds.includes(theme.id)}
        style={styles.checkbox}
        onPress={checked => handleToggle(checked, theme)}
        text={
          <View style={styles.row}>
            <Text style={[styles.name, text.primary]}>{theme.name}</Text>
          </View>
        }
      />
    );
  }

  async function handleSave() {
    try {
      setSaving(true);
      await addThemesToSong(selectedThemeIds, song.id);
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
      <Container style={{flex: 1}} innerStyle={{flex: 1}}>
        <FlatList
          data={themes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderRow}
          style={styles.list}
        />
      </Container>
      <CircleButton
        style={styles.addButton}
        onPress={() => setCreateThemeSheetVisible(true)}>
        <Icon name="plus" size={35} color="white" />
      </CircleButton>
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
  checkbox: {
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
  },
  list: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
  },
});
