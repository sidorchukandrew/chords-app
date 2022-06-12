import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';

export default function Tag({
  tag,
  style: providedStyles,
  textStyle,
  onPress,
  inverse,
  size = 'md',
}) {
  const {lightBlue} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.tagContainer,
        inverse && styles.inverseContainerColor,
        SIZES[size],
        lightBlue.background,
        providedStyles,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.tagText,
          inverse && styles.inverseTextColor,
          FONT_SIZES[size],
          lightBlue.text,
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
