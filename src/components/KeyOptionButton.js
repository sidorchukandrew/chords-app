import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';

export default function KeyOptionButton({
  selected,
  onPress,
  children,
  style: providedStyles,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, selected && styles.selected, providedStyles]}>
      <Text style={[styles.text, selected && styles.selectedText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eaeaea',
    borderRadius: 6,
    height: 50,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#2464eb',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },
});
