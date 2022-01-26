import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Container({
  children,
  size = 'md',
  style: providedStyles,
  padded = true,
}) {
  return (
    <View style={[styles.spacing, providedStyles]}>
      <View style={[styles.container, widths[size], padded && styles.padding]}>
        {children}
      </View>
    </View>
  );
}

const widths = {
  sm: {maxWidth: 450},
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
    width: '100%',
  },
  padding: {
    paddingHorizontal: 15,
  },
});
