import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  clearEdits,
  selectSongOnScreen,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {getPreferredKey, hasAnyKeysSet} from '../utils/song';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SaveChangesBottomBar from '../components/SaveChangesBottomBar';
import SongAdjustmentsBottomSheet from '../components/SongAdjustmentsBottomSheet';
import SongContent from '../components/SongContent';
import {useEffect} from 'react';
import Roadmap from '../components/Roadmap';
import Note from '../components/Note';
import {useTheme} from '../hooks/useTheme';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';

export default function PerformSongScreen({navigation}) {
  const {width} = useWindowDimensions();
  const MIN_WIDTH_TO_SHOW_NOTES = 500;
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();
  const [keyOptionsVisible, setKeyOptionsVisible] = useState(false);
  const [adjustmentsSheetVisible, setAdjustmentsSheetVisible] = useState(false);
  const {surface, text, blue} = useTheme();

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

  useEffect(() => {
    dispatch(clearEdits());
    let show_capo = song.capo;
    let show_transposed = song.transposed_key;

    dispatch(updateSongOnScreen({show_capo, show_transposed}));
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: surface.primary,
      headerTitleStyle: text.primary,
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          {hasAnyKeysSet(song) && (
            <Button
              style={styles.songKeyButton}
              onPress={() => setKeyOptionsVisible(true)}>
              {getPreferredKey(song)}
            </Button>
          )}
          <TouchableOpacity
            style={styles.adjustmentsButton}
            onPress={() => setAdjustmentsSheetVisible(true)}>
            <Icon name="tune-vertical" size={22} color={blue.text.color} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, song, surface, blue, text]);

  function handleNoteChanged(noteId, changes) {
    let updatedNote = song.notes?.find(note => note.id === noteId);
    updatedNote = {...updatedNote, ...changes};

    let updatedNotes = song.notes.map(note =>
      note.id === noteId ? updatedNote : note,
    );

    dispatch(updateSongOnScreen({notes: updatedNotes}));
  }

  function handleNoteDeleted(noteToDeleteId) {
    let updatedNotes = song?.notes.filter(note => note.id !== noteToDeleteId);
    dispatch(updateSongOnScreen({notes: updatedNotes}));
  }

  return (
    <View style={[surface.primary, {flex: 1}]}>
      <ScrollView
        style={[styles.container, surface.primary]}
        pinchGestureEnabled
        maximumZoomScale={4}
        minimumZoomScale={0.5}>
        <Roadmap roadmap={song.roadmap} song={song} />
        <View style={{position: 'relative'}}>
          <SongContent song={song} />
          {width > MIN_WIDTH_TO_SHOW_NOTES &&
            song.notes?.map(note => (
              <Note
                key={note.id}
                note={note}
                onChanged={changes => handleNoteChanged(note.id, changes)}
                song={song}
                onDeleted={handleNoteDeleted}
              />
            ))}
        </View>
      </ScrollView>
      <SaveChangesBottomBar song={song} />
      <KeyOptionsBottomSheet
        visible={keyOptionsVisible}
        onDismiss={() => setKeyOptionsVisible(false)}
        song={song}
      />
      <SongAdjustmentsBottomSheet
        visible={adjustmentsSheetVisible}
        onDismiss={() => setAdjustmentsSheetVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 100,
  },
  songKeyButton: {
    marginRight: 15,
    height: 35,
    width: 35,
    borderRadius: 8,
  },
  adjustmentsButton: {
    padding: 3,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
