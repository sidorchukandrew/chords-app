import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  selectSongOnScreen,
  storeFormatEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import {EDIT_SONGS} from '../utils/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from '../components/RectButton';
import {selectCurrentMember} from '../redux/slices/authSlice';

export default function FontBottomSheetScreen() {
  const song = useSelector(selectSongOnScreen);
  const currentMember = useSelector(selectCurrentMember);
  const dispatch = useDispatch();

  const checkmarkIcon = useRef(
    <Icon name="check" size={22} color="#10b981" />,
  ).current;

  function handleFontChange(newFont) {
    if (newFont !== song.format?.font) {
      let updatedFormat = {...song.format, font: newFont};
      dispatch(updateSongOnScreen({format: updatedFormat}));
      if (currentMember.can(EDIT_SONGS)) {
        let edits = {
          songId: song.id,
          updates: {
            font: newFont,
          },
        };
        dispatch(storeFormatEdits(edits));
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <RectButton
        styles={styles.button}
        onPress={() => handleFontChange('Roboto Mono')}>
        <Text style={styles.fontFamily}>Roboto Mono</Text>
        {song.format?.font === 'Roboto Mono' && checkmarkIcon}
      </RectButton>
      <RectButton
        styles={styles.button}
        onPress={() => handleFontChange('Open Sans')}>
        <Text style={styles.fontFamily}>Open Sans</Text>
        {song.format?.font === 'Open Sans' && checkmarkIcon}
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  fontFamily: {
    color: 'black',
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
