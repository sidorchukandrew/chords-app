import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Detail({title, children, border, data}) {
  return (
    <View style={[styles.detailContainer, border && styles.border]}>
      <Text style={styles.title}>{title}</Text>
      <Text>{data}</Text>
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
    color: '#5f5f5f',
    marginBottom: 3,
    fontWeight: '500',
  },
});
