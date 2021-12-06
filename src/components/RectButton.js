import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

export default function RectButton({
  children,
  onPress,
  styles: providedStyles,
}) {
  return (
    <Pressable onPress={onPress} style={[styles.button, providedStyles]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    paddingHorizontal: 10,
  },
});
