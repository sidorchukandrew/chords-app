import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getHalfStepHigher, getHalfStepLower} from '../utils/music';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function TransposeButtons({transposedKey, onChange}) {
  const {surface, text} = useTheme();

  function handleGoUpHalfStep() {
    onChange(getHalfStepHigher(transposedKey));
  }

  function handleGoDownHalfStep() {
    onChange(getHalfStepLower(transposedKey));
  }

  return (
    <View style={styles.container}>
      <View style={[styles.plusMinusContainer, surface.tertiary]}>
        <TouchableOpacity style={styles.button} onPress={handleGoUpHalfStep}>
          <Icon size={32} name="plus" color={text.primary.color} />
        </TouchableOpacity>
        <View style={styles.keyContainer}>
          <Text style={[styles.keyText, text.primary]}>{transposedKey}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGoDownHalfStep}>
          <Icon size={32} name="minus" color={text.primary.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  plusMinusContainer: {
    maxWidth: 270,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 25,
    fontWeight: '600',
  },
});
