import {StyleSheet, Switch, Text, View} from 'react-native';

import React from 'react';

export default function ToggleField({
  label,
  value,
  onChange,
  style: providedStyles,
  disabled = false,
}) {
  return (
    <View style={[styles.field, providedStyles]}>
      <Text style={[styles.label, disabled && styles.disabledTextColor]}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{true: '#2464eb', false: '#c0c0c0'}}
        thumbColor="white"
        disabled={disabled}
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
    maxWidth: '80%',
  },
  disabledTextColor: {
    color: '#d0d0d0',
  },
});
