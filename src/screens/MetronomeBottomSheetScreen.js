import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSongOnScreen,
  storeSongEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {EDIT_SONGS} from '../utils/auth';
import metronome from '../utils/metronome';
import TapTempo from '../components/TapTempo';

export default function MetronomeBottomSheetScreen() {
  const song = useSelector(selectSongOnScreen);
  const {text, blue} = useTheme();
  const dispatch = useDispatch();
  const currentMember = useSelector(selectCurrentMember);
  const [isPlaying, setIsPlaying] = useState(metronome.isPlaying);
  const [sliderWidth, setSliderWidth] = useState(280);

  function handleBpmChange(newBpm) {
    metronome.setBpm(newBpm);
    updateSong(newBpm);
  }

  function updateSong(newBpm) {
    dispatch(updateSongOnScreen({bpm: newBpm}));

    if (currentMember.can(EDIT_SONGS)) {
      let edits = {
        songId: song.id,
        updates: {
          bpm: newBpm,
        },
      };
      dispatch(storeSongEdits(edits));
    }
  }

  function handleToggle() {
    let shouldPlay = !isPlaying;

    if (shouldPlay) {
      metronome.setBpm(song.bpm);
    }

    setIsPlaying(shouldPlay);
    metronome.toggle();
  }

  return (
    <View style={styles.sheet}>
      <Text style={[styles.bpmText, text.primary]}>{song.bpm}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.incrementButton}
          onPress={() => handleBpmChange(song.bpm - 1)}>
          <Icon name="minus" size={35} color={text.secondary.color} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[blue.background, styles.playButton]}
          onPress={handleToggle}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={50} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.incrementButton}
          onPress={() => handleBpmChange(song.bpm + 1)}>
          <Icon name="plus" size={35} color={text.secondary.color} />
        </TouchableOpacity>
      </View>

      <View
        style={{width: '100%'}}
        onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}>
        <MultiSlider
          min={1}
          max={250}
          step={1}
          values={[song.bpm]}
          onValuesChange={([newBpm]) => handleBpmChange(newBpm)}
          sliderLength={sliderWidth}
          containerStyle={{height: 30, marginTop: 10}}
        />
      </View>
      <View style={styles.speedTextContainer}>
        <Text style={[text.secondary, styles.speedText]}>Slow</Text>
        <Text style={[text.secondary, styles.speedText]}>Fast</Text>
      </View>

      <TapTempo onBpmChange={handleBpmChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  bpmText: {
    fontSize: 45,
    fontWeight: '700',
    textAlign: 'center',
  },
  playButton: {
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  sheet: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  incrementButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  speedText: {
    fontWeight: '500',
    fontSize: 16,
  },
  speedTextContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
});
