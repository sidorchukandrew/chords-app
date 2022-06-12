import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function OrDivider() {
  const {surface, text} = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.line, surface.tertiary]} />
      <Text style={[styles.text, text.secondary]}>OR</Text>
      <View style={[styles.line, surface.tertiary]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    marginHorizontal: 18,
    fontWeight: '500',
  },

  line: {
    height: 1,
    flexGrow: 1,
  },
});
