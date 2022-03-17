import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function KeyOptionButton({
  selected,
  onPress,
  children,
  style: providedStyles,
}) {
  const {surface, text, blue} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        surface.tertiary,
        selected && blue.background,
        providedStyles,
      ]}>
      <Text
        style={[styles.text, text.primary, selected && styles.selectedText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    height: 50,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },
});
