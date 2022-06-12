import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import RectButton from './RectButton';
import {useTheme} from '../hooks/useTheme';

export default function FormatDetailButton({label, detail, onPress}) {
  const {text} = useTheme();

  return (
    <RectButton styles={styles.button} onPress={onPress}>
      <Text style={[styles.label, text.primary]}>{label}</Text>
      <View style={styles.detailSection}>
        <Text style={[styles.detail, text.primary]}>{detail}</Text>
        <Icon name="chevron-right" size={18} color={text.primary.color} />
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
