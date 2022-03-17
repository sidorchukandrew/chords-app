import {StyleSheet, Switch} from 'react-native';

import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function Toggle({style: providedStyles, enabled, onChange}) {
  const {blue} = useTheme();

  return (
    <Switch
      value={enabled}
      onValueChange={onChange}
      trackColor={{true: blue.background.backgroundColor, false: '#c0c0c0'}}
      thumbColor="white"
      style={providedStyles}
    />
  );
}

const styles = StyleSheet.create({});
