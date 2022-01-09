import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  selectSongOnScreen,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from '../components/RectButton';

export default function FontBottomSheetScreen() {
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();

  const checkmarkIcon = useRef(
    <Icon name="check" size={22} color="#10b981" />,
  ).current;

  function handleFontChange(newFont) {
    if (newFont !== song.format?.font) {
      let updatedFormat = {...song.format, font: newFont};
      dispatch(updateSongOnScreen({format: updatedFormat}));
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
