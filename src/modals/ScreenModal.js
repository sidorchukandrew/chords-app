import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function ScreenModal({children}) {
  const {surface} = useTheme();
  return <View style={[styles.container, surface.primary]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
