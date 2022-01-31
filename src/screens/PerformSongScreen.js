import React, {useState} from 'react';
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

export default function PerformSongScreen({navigation}) {
  const {width} = useWindowDimensions();
  const MIN_WIDTH_TO_SHOW_NOTES = 500;
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();
  const [keyOptionsVisible, setKeyOptionsVisible] = useState(false);
  const [adjustmentsSheetVisible, setAdjustmentsSheetVisible] = useState(false);

  useEffect(() => {
    dispatch(clearEdits());
    let show_capo = song.capo;
    let show_transposed = song.transposed_key;

    dispatch(updateSongOnScreen({show_capo, show_transposed}));
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
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
            <Icon name="tune-vertical" size={22} color="#2464eb" />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: props => (
        <Text style={styles.titleText} numberOfLines={1}>
          {props.children}
        </Text>
      ),
    });
  }, [navigation, song]);

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
    <>
      <ScrollView style={styles.container}>
        <Roadmap roadmap={song.roadmap} song={song} />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
