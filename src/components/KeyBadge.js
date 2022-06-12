import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function KeyBadge({children, style: providedStyles}) {
  const {surface, text} = useTheme();
  return (
    <View style={[styles.badge, surface.tertiary, providedStyles]}>
      <Text style={[styles.text, text.secondary]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#e4e7eb',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 3,
    flexGrow: 0,
  },
  text: {
    color: '#374251',
    fontWeight: '700',
    fontSize: 14,
  },
});
