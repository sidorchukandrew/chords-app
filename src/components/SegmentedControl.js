import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function SegmentedControl({
  options = [],
  selected,
  onPress,
  style: providedStyles,
}) {
  return (
    <View style={[styles.container, providedStyles]}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => onPress(option)}
          style={[styles.option, selected === option && styles.selected]}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    fontWeight: '600',
    color: 'black',
  },
  selected: {
    borderBottomColor: '#2464eb',
    borderBottomWidth: 3,
  },
});
