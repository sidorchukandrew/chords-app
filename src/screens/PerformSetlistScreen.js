import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  selectSongOnScreen,
  setSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../components/Button';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SaveChangesBottomBar from '../components/SaveChangesBottomBar';
import SongAdjustmentsBottomSheet from '../components/SongAdjustmentsBottomSheet';
import SongContent from '../components/SongContent';
import {hasAnyKeysSet} from '../utils/song';

export default function PerformSetlistScreen({navigation, route}) {
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

  useEffect(() => {
    dispatch(setSongOnScreen(songs[0]));
  }, []);

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
    if (index === songIndex) {
      return (
        <>
          <ScrollView style={styles.slideContainer}>
            <SongContent song={songOnScreen} />
          </ScrollView>
          <SaveChangesBottomBar song={song} />
        </>
      );
    } else {
      return (
        <>
          <ScrollView style={styles.slideContainer}>
            <SongContent song={song} />
          </ScrollView>
        </>
      );
    }
  }

  function handleSwipedToSong(index) {
    setSongIndex(index);
    dispatch(setSongOnScreen(songs[index]));
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
      />
      <KeyOptionsBottomSheet
        visible={keyOptionsSheetVisible}
        onDismiss={() => setKeyOptionsSheetVisible(false)}
        song={songOnScreen}
      />
      <SongAdjustmentsBottomSheet
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
