import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Container({
  children,
  size = 'md',
  style: providedStyles,
}) {
  return (
    <View style={[styles.spacing, providedStyles]}>
      <View style={[styles.container, widths[size]]}>{children}</View>
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
    maxHeight: '90%',
  },
  container: {
    maxWidth: 550,
    width: '100%',
    paddingHorizontal: 15,
  },
});
