import {MAJOR_KEYS, MINOR_KEYS, isMinor} from '../utils/music';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import KeyOptionButton from '../components/KeyOptionButton';
import OrDivider from '../components/OrDivider';
import {ScrollView} from 'react-native-gesture-handler';
import Toggle from '../components/Toggle';
import TransposeButtons from '../components/TransposeButtons';
import {updateSongOnScreen} from '../redux/slices/performanceSlice';
import {useDispatch} from 'react-redux';

export default function TransposeBottomSheetScreen({route, navigation}) {
  const [song, setSong] = useState(route?.params);
  const [keys] = useState(() => {
    return isMinor(song.original_key) ? MINOR_KEYS : MAJOR_KEYS;
  });
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Toggle enabled={song.show_transposed} onChange={handleToggle} />
      ),
    });
  }, [navigation, song]);

  function handleChange(newKey) {
    setSong(currentSong => ({
      ...currentSong,
      transposed_key: newKey,
    }));
    dispatch(updateSongOnScreen({transposed_key: newKey}));
  }

  function handleToggle(toggleValue) {
    setSong(currentSong => ({...currentSong, show_transposed: toggleValue}));
    dispatch(updateSongOnScreen({show_transposed: toggleValue}));
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
