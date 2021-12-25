import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

export default function SwipeListDeleteButton({onPress, iconSize = 22}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name="delete" size={iconSize} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ef4444',
    height: '100%',
    justifyContent: 'center',
    width: 75,
    alignItems: 'center',
  },
});
