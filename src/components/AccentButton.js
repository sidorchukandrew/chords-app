import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function AccentButton({
  children,
  onPress,
  style: providedStyles,
  full,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, full && styles.full, providedStyles]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eaeaea',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#2464eb',
    fontWeight: '700',
    fontSize: 15,
  },
  full: {
    flex: 1,
  },
});
