import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

export default function CircleButton({
  onPress,
  children,
  style: providedStyles,
  disabled,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledColor, providedStyles]}
      onPress={onPress}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: '#2464eb',
    padding: 5,
  },
  disabledColor: {
    backgroundColor: '#d0d0d0',
  },
});
