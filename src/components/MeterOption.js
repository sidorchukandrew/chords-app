import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function MeterOption({meter, onPress}) {
  return (
    <TouchableOpacity
      onPress={() => onPress(meter.combined)}
      style={styles.button}>
      <Text style={styles.buttonText}>{meter.top}</Text>
      <Text style={styles.buttonText}>{meter.bottom}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eaeaea',
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
