import React from 'react';
import {StyleSheet} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useTheme} from '../hooks/useTheme';

export default function Checkbox({
  size = 25,
  checked,
  text,
  onPress,
  style: providedStyles,
}) {
  const {blue} = useTheme();
  return (
    <BouncyCheckbox
      size={size}
      text={text}
      isChecked={checked}
      onPress={onPress}
      style={[styles.checkbox, providedStyles]}
      fillColor={blue.text.color}
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
