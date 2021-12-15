import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SongAdjustmentsBottomSheet from '../components/SongAdjustmentsBottomSheet';
import {hasAnyKeysSet} from '../utils/song';

export default function PerformSetlistScreen({navigation, route}) {
  const windowWidth = useWindowDimensions().width;
  const [songs] = useState(route.params.songs);
  const [songIndex, setSongIndex] = useState(0);
  const [keyOptionsSheetVisible, setKeyOptionsSheetVisible] = useState(false);
  const [adjustmentsSheetVisible, setAdjustmentsSheetVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: songs[songIndex].name,
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          {hasAnyKeysSet(songs[songIndex]) && (
            <Button
              style={styles.keyButton}
              onPress={() => setKeyOptionsSheetVisible(true)}>
              {songs[songIndex].transposed_key || songs[songIndex].original_key}
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

  function renderSlide({item: song}) {
    return (
      <ScrollView style={styles.slideContainer}>
        <Text>{song.content}</Text>
      </ScrollView>
    );
  }

  function handleSwipedToSong(index) {
    setSongIndex(index);
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
