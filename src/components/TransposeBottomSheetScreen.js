import {MAJOR_KEYS, MINOR_KEYS, isMinor} from '../utils/music';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import KeyOptionButton from './KeyOptionButton';
import OrDivider from './OrDivider';
import {ScrollView} from 'react-native-gesture-handler';
import TransposeButtons from './TransposeButtons';
import {updateSongOnScreen} from '../redux/slices/performanceSlice';
import {useDispatch} from 'react-redux';

export default function TransposeBottomSheetScreen({route}) {
  const [song, setSong] = useState(route?.params);
  const [keys] = useState(() => {
    return isMinor(song.original_key) ? MINOR_KEYS : MAJOR_KEYS;
  });
  const dispatch = useDispatch();

  function handleChange(newKey) {
    setSong(currentSong => ({...currentSong, transposed_key: newKey}));
    dispatch(updateSongOnScreen({transposed_key: newKey}));
  }

  return (
    <View style={styles.container}>
      <TransposeButtons
        transposedKey={song?.transposed_key || song?.original_key}
        onChange={handleChange}
      />
      <OrDivider />
      <ScrollView horizontal style={styles.keyOptions}>
        {keys.map(songKey => (
          <KeyOptionButton
            key={songKey}
            selected={songKey === song.transposed_key}
            onPress={() => handleChange(songKey)}>
            {songKey}
          </KeyOptionButton>
        ))}
      </ScrollView>
      <View style={styles.saveContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  keyOptions: {
    maxHeight: 60,
  },
  saveContainer: {
    flex: 1,
  },
});
