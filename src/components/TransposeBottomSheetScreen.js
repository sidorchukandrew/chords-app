import {MAJOR_KEYS, MINOR_KEYS, isMinor} from '../utils/music';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import KeyOptionButton from './KeyOptionButton';
import OrDivider from './OrDivider';
import TransposeButtons from './TransposeButtons';

export default function TransposeBottomSheetScreen({route}) {
  const [song, setSong] = useState(route?.params);
  const [keys, setKeys] = useState(() => {
    return isMinor(song.original_key) ? MINOR_KEYS : MAJOR_KEYS;
  });

  function handleChange(newKey) {
    setSong(currentSong => ({...currentSong, transposed_key: newKey}));
  }

  return (
    <View style={styles.container}>
      <TransposeButtons
        transposedKey={song?.transposed_key || song?.original_key}
        onChange={handleChange}
      />
      <OrDivider />
      <BottomSheetScrollView horizontal style={styles.keyOptions}>
        {keys.map(songKey => (
          <KeyOptionButton
            key={songKey}
            selected={songKey === song.transposed_key}
            onPress={() => handleChange(songKey)}>
            {songKey}
          </KeyOptionButton>
        ))}
      </BottomSheetScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  keyOptions: {},
});
