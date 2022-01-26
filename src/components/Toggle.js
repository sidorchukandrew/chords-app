import {StyleSheet, Switch} from 'react-native';

import React from 'react';

export default function Toggle({style: providedStyles, enabled, onChange}) {
  return (
    <Switch
      value={enabled}
      onValueChange={onChange}
      trackColor={{true: '#2464eb', false: '#c0c0c0'}}
      thumbColor="white"
      style={providedStyles}
    />
  );
}

const styles = StyleSheet.create({});
