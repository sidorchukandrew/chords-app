import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BinderColorSwatch from './BinderColorSwatch';

export default function BinderDetailHeader({binder}) {
  return (
    <View>
      <View style={styles.colorTitleContainer}>
        {binder.color && (
          <BinderColorSwatch color={binder.color} style={{marginRight: 10}} />
        )}
        <Text style={styles.title}>{binder?.name}</Text>
      </View>
      <Text style={styles.description}>
        {binder.description || 'No description provided yet'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
  },
  colorTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#404040',
    marginTop: 10,
  },
});
