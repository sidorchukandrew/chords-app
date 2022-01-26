import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons';
import React from 'react';
import Toggle from './Toggle';

export default function NotificationSetting({category, setting}) {
  return (
    <View>
      <Text style={styles.categoryText}>{category}</Text>
      <View style={styles.typesContainer}>
        <View style={styles.type}>
          <Text style={styles.typeText}>Email</Text>
          <Toggle />
        </View>
        <View style={styles.type}>
          <Text style={styles.typeText}>Text message</Text>
          <Toggle />
        </View>
        <View style={[styles.type, {borderBottomWidth: 0}]}>
          <Text style={styles.typeText}>Push</Text>
          <Toggle />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  typesContainer: {
    paddingVertical: 10,
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  typeText: {
    color: 'black',
    fontSize: 15,
  },
});
