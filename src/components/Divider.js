import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function Divider({size = 'md', style: providedStyles}) {
  const {isDark} = useTheme();
  return (
    <View style={[styles.spacing, providedStyles]}>
      <View
        style={[
          styles.container,
          widths[size],
          {backgroundColor: isDark ? '#30363d' : '#eaeaea'},
        ]}
      />
    </View>
  );
}

const widths = {
  md: {maxWidth: 550},
  lg: {
    maxWidth: 650,
  },
  xl: {
    maxWidth: 750,
  },
};
const styles = StyleSheet.create({
  spacing: {
    alignItems: 'center',
    flexGrow: 1,
  },
  container: {
    height: 7,
    width: '100%',
  },
});
