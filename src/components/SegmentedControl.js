import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export default function SegmentedControl({
  options = [],
  selected,
  onPress,
  style: providedStyles,
}) {
  return (
    <View style={[styles.container, providedStyles]}>
      {options.map(option => (
        <Pressable
          key={option}
          onPress={() => onPress(option)}
          style={[styles.option, selected === option && styles.selected]}>
          <Text style={styles.optionText}>{option}</Text>
        </Pressable>
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
  },
  selected: {
    borderBottomColor: '#2464eb',
    borderBottomWidth: 3,
  },
});
