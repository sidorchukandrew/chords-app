import {StyleSheet, Text, View} from 'react-native';

import React from 'react';

export default function OrDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>OR</Text>
      <View style={styles.line} />
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
    backgroundColor: '#eaeaea',
    flexGrow: 1,
  },
});
