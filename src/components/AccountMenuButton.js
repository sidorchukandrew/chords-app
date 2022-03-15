import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import RectButton from './RectButton';
import {useTheme} from '../hooks/useTheme';

export default function AccountMenuButton({
  icon,
  text,
  onPress,
  underlined = false,
  iconBackgroundColor,
}) {
  const {border, text: textColor} = useTheme();
  return (
    <RectButton
      onPress={onPress}
      styles={[
        styles.button,
        underlined && {...styles.underline, ...border.primary},
      ]}>
      <View
        style={[styles.iconContainer, {backgroundColor: iconBackgroundColor}]}>
        <Icon name={icon} size={18} color="white" />
      </View>
      <Text style={[styles.text, textColor.primary]}>{text}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    marginLeft: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underline: {
    borderBottomWidth: 1,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 50,
  },
});
