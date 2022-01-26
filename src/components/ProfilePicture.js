import {Image, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {getAvatarInitials} from '../utils/member';

export default function ProfilePicture({
  url,
  style: providedStyles,
  size = 'sm',
  member,
}) {
  function determineInitialsBackgroundColor() {
    let initials = getAvatarInitials(member);
    let sumOfLetters = initials
      .split('')
      .reduce((prevSum, letter) => prevSum + letter.charCodeAt(0), 0);

    let colorIndex = sumOfLetters % backgroundColors.length;
    return {backgroundColor: backgroundColors[colorIndex]};
  }

  if (url) {
    return (
      <Image
        source={{uri: url}}
        style={[styles.image, sizes[size], providedStyles]}
      />
    );
  } else if (member) {
    return (
      <View
        style={[
          sizes[size],
          styles.initialsContainer,
          determineInitialsBackgroundColor(),
          providedStyles,
        ]}>
        <Text style={[styles.initialsText, fontSizes[size]]}>
          {getAvatarInitials(member)}
        </Text>
      </View>
    );
  } else {
    return (
      <Icon
        name="account-circle-outline"
        color="#505050"
        size={sizes[size].width}
        style={[providedStyles]}
      />
    );
  }
}

const sizes = {
  sm: {
    height: 20,
    width: 20,
  },
  md: {
    height: 30,
    width: 30,
  },
  lg: {
    height: 45,
    width: 45,
  },
  xl: {
    height: 90,
    width: 90,
  },
};

const fontSizes = {
  sm: {
    fontSize: 10,
  },
  md: {
    fontSize: 12,
  },
  lg: {
    fontSize: 17,
  },
  xl: {
    fontSize: 35,
  },
};

const backgroundColors = [
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#4ade80',
  '#38bdf8',
  '#a78bfa',
  '#fb7185',
];

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
  },
  initialsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  initialsText: {
    color: 'white',
    fontWeight: '500',
  },
});
