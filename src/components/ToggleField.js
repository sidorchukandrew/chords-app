import {StyleSheet, Switch, Text, View} from 'react-native';

import React from 'react';

export default function ToggleField({
  label,
  enabled,
  onChange,
  style: providedStyles,
}) {
  return (
    <View style={[styles.field, providedStyles]}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={enabled}
        onValueChange={onChange}
        trackColor={{true: '#2464eb', false: '#c0c0c0'}}
        ios_backgroundColor="#2464eb"
        thumbColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
});
