import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function Button({
  children,
  onPress,
  style: providedStyles,
  full,
  disabled,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        full && styles.full,
        disabled && styles.disabled,
        providedStyles,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2464eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  full: {
    flex: 1,
  },
  disabled: {
    backgroundColor: '#eaeaea',
  },
  disabledText: {
    color: '#a0a0a0',
  },
});
