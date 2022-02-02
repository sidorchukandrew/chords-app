import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Tag({
  tag,
  style: providedStyles,
  textStyle,
  onPress,
  inverse,
  size = 'md',
}) {
  return (
    <TouchableOpacity
      style={[
        styles.tagContainer,
        inverse && styles.inverseContainerColor,
        SIZES[size],
        providedStyles,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.tagText,
          inverse && styles.inverseTextColor,
          FONT_SIZES[size],
          textStyle,
        ]}>
        {tag}
      </Text>
    </TouchableOpacity>
  );
}

const SIZES = {
  sm: {
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  md: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
};

const FONT_SIZES = {
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
};

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: '#ddf4ff',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  tagText: {
    color: '#2464eb',
    fontWeight: '600',
  },
  inverseContainerColor: {
    backgroundColor: '#2464eb',
  },
  inverseTextColor: {
    color: 'white',
  },
});
