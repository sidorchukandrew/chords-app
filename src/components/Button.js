import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function Button({
  children,
  onPress,
  style: providedStyles,
  full,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, full && styles.full, providedStyles]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2464eb',
    paddingVertical: 12,
    borderRadius: 8,
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
});
