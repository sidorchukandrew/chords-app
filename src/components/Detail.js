import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

export default function Detail({title, border, data}) {
  const {text, border: borderColor} = useTheme();
  return (
    <View style={[styles.detailContainer, border && borderColor.primary]}>
      <Text style={[styles.title, text.secondary]}>{title}</Text>
      <Text style={text.primary}>{data || 'None yet'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    paddingVertical: 14,
    paddingLeft: 8,
    marginLeft: 7,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  title: {
    marginBottom: 3,
    fontWeight: '500',
  },
});
