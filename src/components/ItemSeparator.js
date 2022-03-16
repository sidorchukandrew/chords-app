import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function ItemSeparator() {
  const {isDark, border} = useTheme();
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: isDark
            ? border.secondary.borderColor
            : border.primary.borderColor,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
  },
});
