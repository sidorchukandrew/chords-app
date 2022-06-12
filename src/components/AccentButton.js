import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function AccentButton({
  children,
  onPress,
  style: providedStyles,
  full,
  icon,
  textStyle,
}) {
  const {surface, blue} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        full && styles.full,
        surface.tertiary,
        providedStyles,
      ]}>
      {icon}
      <Text style={[styles.buttonText, blue.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 15,
  },
  full: {
    flex: 1,
  },
});
