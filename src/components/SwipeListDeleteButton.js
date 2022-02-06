import {StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

export default function SwipeListDeleteButton({
  onPress,
  iconSize = 22,
  enabled,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        enabled ? styles.enabledColor : styles.disabledColor,
      ]}
      disabled={!enabled}>
      <Icon name="delete" size={iconSize} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: '100%',
    justifyContent: 'center',
    width: 75,
    alignItems: 'center',
  },
  disabledColor: {
    backgroundColor: '#d0d0d0',
  },
  enabledColor: {
    backgroundColor: '#ef4444',
  },
});
