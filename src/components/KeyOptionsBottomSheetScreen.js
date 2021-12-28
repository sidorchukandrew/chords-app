import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from './RectButton';
import {selectSongOnScreen} from '../redux/slices/performanceSlice';
import {useSelector} from 'react-redux';

export default function KeyOptionsBottomSheetScreen({navigation}) {
  const song = useSelector(selectSongOnScreen);

  return (
    <View style={styles.container}>
      <RectButton
        onPress={() => navigation.navigate('KeyOptions Transpose')}
        styles={styles.button}>
        <Text style={styles.buttonText}>Transpose</Text>
        {song.transposed_key && <Icon name="check" color="#10b981" size={22} />}
      </RectButton>
      <RectButton
        onPress={() => navigation.navigate('KeyOptions Capo')}
        styles={styles.button}>
        <Text style={styles.buttonText}>Capo</Text>
        {song.capo && <Icon name="check" color="#10b981" size={22} />}
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: '600',
    color: 'black',
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
