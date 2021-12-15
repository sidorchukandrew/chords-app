import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfilePicture({
  url,
  style: providedStyles,
  size = 'sm',
}) {
  return url ? (
    <Image
      source={{uri: url}}
      style={[styles.image, sizes[size], providedStyles]}
    />
  ) : (
    <Icon
      name="account-circle-outline"
      color="#505050"
      size={sizes[size].width}
      style={[providedStyles]}
    />
  );
}

const sizes = {
  sm: {
    height: 20,
    width: 20,
  },
  md: {
    height: 35,
    width: 35,
  },
  lg: {
    height: 60,
    width: 60,
  },
  xl: {
    height: 90,
    width: 90,
  },
};
const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
  },
});
