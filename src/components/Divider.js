import {StyleSheet, View} from 'react-native';

import React from 'react';

export default function Divider({size = 'md', style: providedStyles}) {
  return (
    <View style={[styles.spacing, providedStyles]}>
      <View style={[styles.container, widths[size]]} />
    </View>
  );
}

const widths = {
  md: {maxWidth: 550},
  lg: {
    maxWidth: 650,
  },
  xl: {
    maxWidth: 750,
  },
};
const styles = StyleSheet.create({
  spacing: {
    alignItems: 'center',
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#eaeaea',
    height: 7,
    width: '100%',
  },
});
