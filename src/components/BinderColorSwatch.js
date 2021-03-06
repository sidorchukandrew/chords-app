import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function BinderColorSwatch({color, style: providedStyles}) {
  return (
    <View style={[styles.container, SWATCH_COLORS[color], providedStyles]} />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 22,
    height: 22,
    borderRadius: 8,
  },
});

export const SWATCH_COLORS = {
  blue: {
    backgroundColor: '#5fa5f9',
  },
  green: {
    backgroundColor: '#35d399',
  },
  red: {
    backgroundColor: '#f87171',
  },
  yellow: {
    backgroundColor: '#fbbe24',
  },
  purple: {
    backgroundColor: '#A78BFA',
  },
  indigo: {
    backgroundColor: '#818CF8',
  },
  pink: {
    backgroundColor: '#F472B6',
  },
  gray: {
    backgroundColor: '#9ca3af',
  },
};
