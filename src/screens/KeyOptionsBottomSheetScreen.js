import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from '../components/RectButton';
import {selectSongOnScreen} from '../redux/slices/performanceSlice';
import {useSelector} from 'react-redux';
import {useTheme} from '../hooks/useTheme';

export default function KeyOptionsBottomSheetScreen({navigation}) {
  const song = useSelector(selectSongOnScreen);
  const {text, surface, isDark} = useTheme();

  return (
    <View
      style={[styles.container, isDark ? surface.secondary : surface.primary]}>
      <RectButton
        onPress={() => navigation.navigate('KeyOptions Transpose')}
        styles={styles.button}>
        <Text style={[styles.buttonText, text.primary]}>Transpose</Text>
        {song.show_transposed && song.transposed_key && (
          <Icon name="check" color="#10b981" size={22} />
        )}
      </RectButton>
      <RectButton
        onPress={() => navigation.navigate('KeyOptions Capo')}
        styles={styles.button}>
        <Text style={[styles.buttonText, text.primary]}>Capo</Text>
        {song.show_capo && song.capo && (
          <Icon name="check" color="#10b981" size={22} />
        )}
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: '600',
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
