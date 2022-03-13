import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import RectButton from './RectButton';

export default function AccountMenuButton({
  icon,
  text,
  onPress,
  underlined = false,
  iconBackgroundColor,
}) {
  return (
    <RectButton
      onPress={onPress}
      styles={[styles.button, underlined && styles.underline]}>
      <View
        style={[styles.iconContainer, {backgroundColor: iconBackgroundColor}]}>
        <Icon name={icon} size={18} color="white" />
      </View>
      <Text style={styles.text}>{text}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 17,
    marginLeft: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underline: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 50,
  },
});
