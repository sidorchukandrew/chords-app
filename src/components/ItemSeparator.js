import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#eaeaea',
    height: 1,
    width: '100%',
  },
});
