import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SWATCH_COLORS} from './BinderColorSwatch';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ColorSwatchOption({
  color,
  selected,
  onPress,
  useHexColor,
  hexValue,
}) {
  function determineColor() {
    if (useHexColor) {
      return hexValue;
    }
    if (!color || color === 'None') {
      return styles.transparentSwatch;
    } else {
      return SWATCH_COLORS[color];
    }
  }

  function determineSelectedColor() {
    return !color || color === 'None' ? '#606060' : 'white';
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.swatch, determineColor()]}>
      {selected && (
        <Icon name="check" color={determineSelectedColor()} size={30} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  swatch: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparentSwatch: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});
