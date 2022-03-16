import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function SegmentedControl({
  options = [],
  selected,
  onPress,
  style: providedStyles,
}) {
  const {text} = useTheme();
  return (
    <View style={[styles.container, providedStyles]}>
      {options.map(option =>
        option ? (
          <TouchableOpacity
            key={option}
            onPress={() => onPress(option)}
            style={[styles.option, selected === option && styles.selected]}>
            <Text style={[styles.optionText, text.primary]}>{option}</Text>
          </TouchableOpacity>
        ) : null,
      )}
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
