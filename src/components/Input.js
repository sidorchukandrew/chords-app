import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default function Input({
  value,
  onChange,
  placeholder,
  style: providedStyles,
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      style={[styles.input, styles.lightColors, providedStyles]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  lightColors: {
    backgroundColor: '#e4e7eb',
  },
  darkColors: {},
});
