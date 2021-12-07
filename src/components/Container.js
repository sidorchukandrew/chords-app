import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Container({children}) {
  return (
    <View style={styles.spacing}>
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  spacing: {
    alignItems: 'center',
    flex: 1,
  },
  container: {
    maxWidth: 550,
    width: '100%',
    paddingHorizontal: 20,
  },
});
