import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function MeterOption({meter, onPress}) {
  const {surface, text} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => onPress(meter.combined)}
      style={[styles.button, surface.tertiary]}>
      <Text style={[styles.buttonText, text.primary]}>{meter.top}</Text>
      <Text style={[styles.buttonText, text.primary]}>{meter.bottom}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    borderRadius: 6,
    width: 35,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
});
