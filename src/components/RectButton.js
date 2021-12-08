import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

export default function RectButton({
  children,
  onPress,
  styles: providedStyles,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, providedStyles]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    paddingHorizontal: 10,
  },
});
