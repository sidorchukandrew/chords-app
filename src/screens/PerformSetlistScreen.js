import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {
  clearEdits,
  selectSongOnScreen,
  setSongOnScreen,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SaveChangesBottomBar from '../components/SaveChangesBottomBar';
import SongContent from '../components/SongContent';
import Roadmap from '../components/Roadmap';
import Note from '../components/Note';
import SetlistNavigation from '../components/SetlistNavigation';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';
import SetlistAdjustmentsBottomSheet from '../components/SetlistAdjustmentsBottomSheet';
import {
  selectDisableSwipeInSetlist,
  selectShowSetlistNavigation,
} from '../redux/slices/appearanceSlice';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import PerformSongHeaderButtons from '../components/PerformSongHeaderButtons';
import SongToolsBottomSheet from '../components/SongToolsBottomSheet';
import metronome from '../utils/metronome';

export default function PerformSetlistScreen({navigation, route}) {
  const {width} = useWindowDimensions();
  const MIN_WIDTH_TO_SHOW_NOTES = 500;
  const windowWidth = useWindowDimensions().width;
  const [songs, setSongs] = useState(() => {
    return route.params.songs?.map(song => ({
      ...song,
      show_transposed: !!song.transposed_key,
      show_capo: !!song.capo,
    }));
  });
  const [songIndex, setSongIndex] = useState(0);
  const [keyOptionsSheetVisible, setKeyOptionsSheetVisible] = useState(false);
  const [adjustmentsSheetVisible, setAdjustmentsSheetVisible] = useState(false);
  const [toolsSheetVisible, setToolsSheetVisible] = useState(false);
  const songOnScreen = useSelector(selectSongOnScreen);
  const showSetlistNavigation = useSelector(selectShowSetlistNavigation);
  const disableSwipeInSetlist = useSelector(selectDisableSwipeInSetlist);
  const dispatch = useDispatch();
  const carouselRef = useRef();
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
    dispatch(setSongOnScreen(songs[0]));
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearEdits());
    }, [dispatch]),
  );

  useEffect(() => {
    setSongs(currentSongs =>
      currentSongs.map((song, index) =>
        index === songIndex ? songOnScreen : song,
      ),
    );
  }, [songOnScreen]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: text.primary,
      headerStyle: surface.primary,
      title: songs[songIndex]?.name,
      headerRight: () => (
        <PerformSongHeaderButtons
          song={songs[songIndex]}
          toggleKeyOptionsVisible={setKeyOptionsSheetVisible}
          toggleAdjustmentsSheetVisible={setAdjustmentsSheetVisible}
          toggleToolsSheetVisible={setToolsSheetVisible}
        />
      ),
    });
  }, [navigation, songIndex, songs, surface, text, blue]);

  useEffect(() => {
    return () => metronome.stop();
  }, []);

  function renderSlide({item: song, index}) {
    if (!song) {
      return <View />;
    }

    if (index === songIndex) {
      return (
        <>
          <ScrollView
            style={[styles.slideContainer, surface.primary]}
            pinchGestureEnabled
            maximumZoomScale={4}
            minimumZoomScale={0.5}>
            <Roadmap roadmap={song?.roadmap} song={song} />
            <View style={{position: 'relative'}}>
              <SongContent song={songOnScreen} />
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
        </>
      );
    } else {
      return (
        <>
          <ScrollView
            style={[styles.slideContainer, surface.primary]}
            pinchGestureEnabled
            maximumZoomScale={4}
            minimumZoomScale={0.5}>
            <Roadmap roadmap={song?.roadmap} song={song} />
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
        </>
      );
    }
  }

  function handleSwipedToSong(index) {
    setSongIndex(index);
    metronome.stop();
    dispatch(setSongOnScreen(songs[index]));
    carouselRef.current.snapToItem(index, true);
  }

  function handleNoteChanged(noteId, changes) {
    let updatedNote = songOnScreen.notes?.find(note => note.id === noteId);
    updatedNote = {...updatedNote, ...changes};

    let updatedNotes = songOnScreen.notes.map(note =>
      note.id === noteId ? updatedNote : note,
    );

    dispatch(updateSongOnScreen({notes: updatedNotes}));
  }

  function handleNoteDeleted(noteToDeleteId) {
    let updatedNotes = songOnScreen?.notes.filter(
      note => note.id !== noteToDeleteId,
    );
    dispatch(updateSongOnScreen({notes: updatedNotes}));
  }

  return (
    <View style={[styles.screenContainer, surface.primary]}>
      <Carousel
        layout="default"
        data={songs}
        renderItem={renderSlide}
        itemWidth={windowWidth}
        sliderWidth={windowWidth}
        onSnapToItem={handleSwipedToSong}
        ref={carouselRef}
        scrollEnabled={!disableSwipeInSetlist}
      />
      {showSetlistNavigation && (
        <SetlistNavigation
          songs={songs}
          songIndex={songIndex}
          onNext={() => handleSwipedToSong(songIndex + 1)}
          onBack={() => handleSwipedToSong(songIndex - 1)}
        />
      )}
      <KeyOptionsBottomSheet
        visible={keyOptionsSheetVisible}
        onDismiss={() => setKeyOptionsSheetVisible(false)}
        song={songOnScreen}
      />
      <SetlistAdjustmentsBottomSheet
        visible={adjustmentsSheetVisible}
        onDismiss={() => setAdjustmentsSheetVisible(false)}
      />
      <SongToolsBottomSheet
        visible={toolsSheetVisible}
        onDismiss={() => setToolsSheetVisible(false)}
        sessionsEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 100,
  },
  slideContainer: {
    width: '100%',
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  screenContainer: {flex: 1, height: '100%'},
  keyButton: {
    marginRight: 15,
    height: 35,
    width: 35,
    borderRadius: 8,
  },
});
