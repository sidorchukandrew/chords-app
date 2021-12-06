import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Button({children}) {
  return <TouchableOpacity style={styles.button}>{children}</TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2464eb',
  },
});
