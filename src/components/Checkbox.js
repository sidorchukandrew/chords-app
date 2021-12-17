import React from 'react';
import {StyleSheet} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function Checkbox({
  size = 25,
  checked,
  text,
  onPress,
  style: providedStyles,
}) {
  return (
    <BouncyCheckbox
      size={size}
      text={text}
      isChecked={checked}
      onPress={onPress}
      style={[styles.checkbox, providedStyles]}
      fillColor="#2464eb"
      iconStyle={styles.icon}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 8,
  },
});
