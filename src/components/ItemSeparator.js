import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function ItemSeparator() {
  const {isDark} = useTheme();
  return (
    <View
      style={[
        styles.separator,
        {backgroundColor: isDark ? '#30363d' : '#eaeaea'},
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#eaeaea',
    height: 1,
    width: '100%',
  },
});
