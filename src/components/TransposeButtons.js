import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getHalfStepHigher, getHalfStepLower} from '../utils/music';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

export default function TransposeButtons({transposedKey, onChange}) {
  function handleGoUpHalfStep() {
    onChange(getHalfStepHigher(transposedKey));
  }

  function handleGoDownHalfStep() {
    onChange(getHalfStepLower(transposedKey));
  }

  return (
    <View style={styles.container}>
      <View style={styles.plusMinusContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGoUpHalfStep}>
          <Icon size={32} name="plus" color="black" />
        </TouchableOpacity>
        <View style={styles.keyContainer}>
          <Text style={styles.keyText}>{transposedKey}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGoDownHalfStep}>
          <Icon size={32} name="minus" color="black" />
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
    backgroundColor: '#eaeaea',
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
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
  },
});
