import React, {useCallback, useState, useRef} from 'react';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {
  clearEdits,
  selectSongOnScreen,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

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
import PerformSongHeaderButtons from '../components/PerformSongHeaderButtons';
import SongToolsBottomSheet from '../components/SongToolsBottomSheet';
import {SPEEDS} from '../utils/autoscroll';

export default function PerformSongScreen({navigation}) {
  const {width} = useWindowDimensions();
  const MIN_WIDTH_TO_SHOW_NOTES = 500;
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();
  const [keyOptionsVisible, setKeyOptionsVisible] = useState(false);
  const [adjustmentsSheetVisible, setAdjustmentsSheetVisible] = useState(false);
  const [toolsSheetVisible, setToolsSheetVisible] = useState(false);
  const {surface, text} = useTheme();
  const scrollRef = useRef();
  const [scrollPositionY, setScrollPositionY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

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
    let show_capo = !!song.capo;
    let show_transposed = !!song.transposed_key;

    dispatch(updateSongOnScreen({show_capo, show_transposed}));
  }, [dispatch]);

  useEffect(() => {
    let {distance, interval} = SPEEDS[song.scroll_speed];
    let id;
    if (song.is_scrolling && scrollPositionY + distance < scrollHeight) {
      id = setInterval(() => {
        scrollRef.current.scrollTo({
          x: 0,
          y: scrollPositionY + distance,
        });
      }, interval);
    }

    return () => clearInterval(id);
  }, [song.is_scrolling, song.scroll_speed, scrollPositionY, scrollHeight]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: surface.primary,
      headerTitleStyle: text.primary,
      headerRight: () => (
        <PerformSongHeaderButtons
          song={song}
          toggleKeyOptionsVisible={setKeyOptionsVisible}
          toggleAdjustmentsSheetVisible={setAdjustmentsSheetVisible}
          toggleToolsSheetVisible={setToolsSheetVisible}
        />
      ),
    });
  }, [navigation, song, surface, text]);

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

  function handleScroll(e) {
    console.log(e.nativeEvent.contentOffset.y);
    setScrollPositionY(e.nativeEvent.contentOffset.y);
  }

  return (
    <View style={[surface.primary, {flex: 1}]}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        style={[styles.container, surface.primary]}
        scrollEventThrottle={6}
        pinchGestureEnabled
        maximumZoomScale={4}
        onLayout={e => setScrollHeight(e.nativeEvent.layout.height)}
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
      <SongToolsBottomSheet
        visible={toolsSheetVisible}
        onDismiss={() => setToolsSheetVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
