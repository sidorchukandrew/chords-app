import {MAJOR_KEYS, MINOR_KEYS, isMinor} from '../utils/music';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  storeSongEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import {EDIT_SONGS} from '../utils/auth';
import KeyOptionButton from '../components/KeyOptionButton';
import OrDivider from '../components/OrDivider';
import {ScrollView} from 'react-native-gesture-handler';
import Toggle from '../components/Toggle';
import TransposeButtons from '../components/TransposeButtons';
import {selectCurrentMember} from '../redux/slices/authSlice';

export default function TransposeBottomSheetScreen({route, navigation}) {
  const [song, setSong] = useState(route?.params);
  const [keys] = useState(() => {
    return isMinor(song.original_key) ? MINOR_KEYS : MAJOR_KEYS;
  });
  const dispatch = useDispatch();
  const currentMember = useSelector(selectCurrentMember);

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
    if (currentMember.can(EDIT_SONGS)) {
      let edits = {
        songId: song.id,
        updates: {
          transposed_key: newKey,
        },
      };
      dispatch(storeSongEdits(edits));
    }
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
