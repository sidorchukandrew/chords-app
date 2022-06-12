import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSongOnScreen,
  storeSongEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../hooks/useTheme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {EDIT_SONGS} from '../utils/auth';

export default function AutoscrollBottomSheetScreen() {
  const song = useSelector(selectSongOnScreen);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const {blue, text} = useTheme();
  const dispatch = useDispatch();
  const [sliderWidth, setSliderWidth] = useState(280);
  const currentMember = useSelector(selectCurrentMember);

  function handleToggleAutoscroll() {
    dispatch(updateSongOnScreen({is_scrolling: !song.is_scrolling}));
  }

  function handleScrollSpeedChange([newSpeed]) {
    dispatch(updateSongOnScreen({scroll_speed: newSpeed}));

    if (currentMember.can(EDIT_SONGS)) {
      let edits = {
        songId: song.id,
        updates: {
          scroll_speed: newSpeed,
        },
      };
      dispatch(storeSongEdits(edits));
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      scrollEnabled={scrollEnabled}>
      <View style={styles.playButtonContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={handleToggleAutoscroll}>
          <Icon
            name={song.is_scrolling ? 'pause-circle' : 'play-circle'}
            size={60}
            color={blue.text.color}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[text.primary, styles.text]}>
          Current speed is{' '}
          <Text style={styles.scrollSpeedText}>{song.scroll_speed}</Text>
        </Text>
      </View>
      <View
        style={styles.sliderContainer}
        onLayout={e =>
          setSliderWidth(e.nativeEvent.layout.width - styles.screen.padding * 2)
        }>
        <MultiSlider
          values={[song.scroll_speed || 1]}
          sliderLength={sliderWidth}
          onValuesChangeStart={() => setScrollEnabled(false)}
          onValuesChangeFinish={() => setScrollEnabled(true)}
          onValuesChange={handleScrollSpeedChange}
          min={1}
          max={11}
          step={1}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
  },
  playButtonContainer: {
    alignItems: 'center',
  },
  playButton: {
    padding: 10,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    marginVertical: 10,
  },
  scrollSpeedText: {
    fontSize: 19,
    fontWeight: '700',
  },
});
