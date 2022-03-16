import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function CircleButton({
  onPress,
  children,
  style: providedStyles,
  disabled,
}) {
  const {blue, text} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        blue.background,
        disabled && text.disabled,
        providedStyles,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 5,
  },
});
