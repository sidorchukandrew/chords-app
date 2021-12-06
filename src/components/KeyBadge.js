import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function KeyBadge({children, style: providedStyles}) {
  return (
    <View style={[styles.badge, providedStyles]}>
      <Text style={styles.text}>{children}</Text>
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
