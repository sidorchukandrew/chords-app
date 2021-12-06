import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

export default function CircleButton({
  onPress,
  children,
  style: providedStyles,
}) {
  return (
    <TouchableOpacity style={[styles.button, providedStyles]} onPress={onPress}>
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
});
