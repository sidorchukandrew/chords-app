import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import RectButton from './RectButton';

export default function FormatDetailButton({label, detail, onPress}) {
  return (
    <RectButton styles={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.detailSection}>
        <Text style={styles.detail}>{detail}</Text>
        <Icon name="chevron-right" size={18} />
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  detail: {
    fontSize: 16,
    marginRight: 10,
  },
  detailSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
