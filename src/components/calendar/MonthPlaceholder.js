import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks/useTheme';

export default function MonthPlaceholder({month, height}) {
  const {text} = useTheme();
  return (
    <View style={[styles.container, {height}]}>
      <Text style={[text.primary, styles.monthText]}>{month}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 24,
  },
});
