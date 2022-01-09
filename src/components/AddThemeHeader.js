import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import RectButton from './RectButton';

export default function AddThemeHeader({onCreatePress}) {
  return (
    <View style={styles.border}>
      <RectButton styles={styles.button} onPress={onCreatePress}>
        <Icon size={23} name="plus-circle" color="#2464eb" />
        <Text style={styles.text}>Create theme</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
