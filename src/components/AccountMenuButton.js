import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import RectButton from './RectButton';

export default function AccountMenuButton({icon, text, onPress}) {
  return (
    <RectButton onPress={onPress} styles={styles.button}>
      <Icon name={icon} size={18} color="black" />
      <Text style={styles.text}>{text}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 17,
    marginLeft: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
