import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function SectionTitle({children, style: providedStyles}) {
  return <Text syle={[styles.title, providedStyles]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
});
