import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import CapoOption from './CapoOption';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {determineCapos} from '../utils/capo';
import {updateSongOnScreen} from '../redux/slices/performanceSlice';
import {useDispatch} from 'react-redux';

export default function CapoBottomSheetScreen({route}) {
  const [song, setSong] = useState(route.params);
  const {commonKeys: commonCapos, uncommonKeys: uncommonCapos} = determineCapos(
    song.transposed_key || song.original_key,
  );
  const dispatch = useDispatch();

  function handleChange(capoKey) {
    setSong(currentSong => {
      if (currentSong.capo) {
        let updatedCapo = {...currentSong.capo, capo_key: capoKey};
        dispatch(updateSongOnScreen({capo: updatedCapo}));
        return {...currentSong, capo: updatedCapo};
      } else {
        dispatch(updateSongOnScreen({capo: {capo_key: capoKey}}));
        return {...currentSong, capo: {capo_key: capoKey}};
      }
    });
  }

  function handleRemoveCapo() {
    setSong(currentSong => ({...currentSong, capo: null}));
    dispatch(updateSongOnScreen({capo: null}));
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.capoOptions}>
        <CapoOption
          capo={{
            capoNumber: 0,
            capoKey: (
              <Icon
                name="close-circle-outline"
                color={song.capo ? '#505050' : 'white'}
                size={30}
              />
            ),
          }}
          onPress={handleRemoveCapo}
          selected={!song.capo}
        />
        {commonCapos.map(capo => (
          <CapoOption
            capo={capo}
            key={capo.capoKey}
            selected={song.capo?.capo_key === capo.capoKey}
            onPress={handleChange}
          />
        ))}
        {uncommonCapos.map(capo => (
          <CapoOption
            capo={capo}
            key={capo.capoKey}
            selected={song.capo?.capo_key === capo.capoKey}
            onPress={handleChange}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  capoOptions: {
    maxHeight: 90,
  },
});
