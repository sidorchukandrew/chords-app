import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import CapoOption from '../components/CapoOption';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import Toggle from '../components/Toggle';
import {determineCapos} from '../utils/capo';
import {
  storeSongEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch} from 'react-redux';
import {useTheme} from '../hooks/useTheme';

export default function CapoBottomSheetScreen({route, navigation}) {
  const [song, setSong] = useState(route.params);
  const {commonKeys: commonCapos, uncommonKeys: uncommonCapos} = determineCapos(
    song.transposed_key || song.original_key,
  );
  const dispatch = useDispatch();
  const {surface, text, blue, isDark} = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: isDark ? surface.secondary : surface.primary,
      headerTitleStyle: text.primary,
      headerRight: () => (
        <Toggle enabled={song.show_capo} onChange={handleToggle} />
      ),
    });
  }, [navigation, song, surface, text, isDark]);

  function handleChange(capoKey) {
    setSong(currentSong => {
      let edits = {
        songId: song.id,
        updates: {
          capo_key: capoKey,
        },
      };
      dispatch(storeSongEdits(edits));
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
    let edits = {
      songId: song.id,
      updates: {
        capo_key: null,
        capoId: song?.capo?.id,
      },
    };
    dispatch(storeSongEdits(edits));
  }

  function handleToggle(toggleValue) {
    setSong(currentSong => ({...currentSong, show_capo: toggleValue}));
    dispatch(updateSongOnScreen({show_capo: toggleValue}));
  }

  return (
    <View
      style={[styles.container, isDark ? surface.secondary : surface.primary]}>
      <ScrollView horizontal style={styles.capoOptions}>
        <CapoOption
          capo={{
            capoNumber: 0,
            capoKey: (
              <Icon
                name="close-circle-outline"
                color={song.capo ? text.secondary.color : 'white'}
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
    padding: 10,
  },
  capoOptions: {
    maxHeight: 90,
  },
});
