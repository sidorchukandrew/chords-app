import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  clearEdits,
  selectSongOnScreen,
  setSongOnScreen,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../components/Button';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SaveChangesBottomBar from '../components/SaveChangesBottomBar';
import SongContent from '../components/SongContent';
import {hasAnyKeysSet} from '../utils/song';
import Roadmap from '../components/Roadmap';
import Note from '../components/Note';
import SetlistNavigation from '../components/SetlistNavigation';
import {useFocusEffect} from '@react-navigation/native';
import SetlistAdjustmentsBottomSheet from '../components/SetlistAdjustmentsBottomSheet';

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
  const songOnScreen = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();
  const carouselRef = useRef();

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
      title: songs[songIndex]?.name,
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          {hasAnyKeysSet(songs[songIndex]) && (
            <Button
              style={styles.keyButton}
              onPress={() => setKeyOptionsSheetVisible(true)}>
              {(songs[songIndex].show_capo &&
                songs[songIndex].capo?.capo_key) ||
                (songs[songIndex].show_transposed &&
                  songs[songIndex].transposed_key) ||
                songs[songIndex].original_key}
            </Button>
          )}
          <TouchableOpacity
            style={{padding: 3}}
            onPress={() => setAdjustmentsSheetVisible(true)}>
            <Icon name="tune-vertical" size={22} color="#2464eb" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, songIndex, songs]);

  function renderSlide({item: song, index}) {
    if (!song) {
      return <View />;
    }

    if (index === songIndex) {
      return (
        <>
          <ScrollView
            style={styles.slideContainer}
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
            style={styles.slideContainer}
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
    <View style={styles.screenContainer}>
      <Carousel
        layout="default"
        data={songs}
        renderItem={renderSlide}
        itemWidth={windowWidth}
        sliderWidth={windowWidth}
        onSnapToItem={handleSwipedToSong}
        ref={carouselRef}
      />
      <SetlistNavigation
        songs={songs}
        songIndex={songIndex}
        onNext={() => handleSwipedToSong(songIndex + 1)}
        onBack={() => handleSwipedToSong(songIndex - 1)}
      />
      <KeyOptionsBottomSheet
        visible={keyOptionsSheetVisible}
        onDismiss={() => setKeyOptionsSheetVisible(false)}
        song={songOnScreen}
      />
      <SetlistAdjustmentsBottomSheet
        visible={adjustmentsSheetVisible}
        onDismiss={() => setAdjustmentsSheetVisible(false)}
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
    marginBottom: 20,
  },
  screenContainer: {flex: 1, backgroundColor: 'white', height: '100%'},
  keyButton: {
    marginRight: 15,
    height: 35,
    width: 35,
    borderRadius: 8,
  },
});
