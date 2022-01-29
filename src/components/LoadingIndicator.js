import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export default function LoadingIndicator({
  color = 'gray',
  size = 'small',
  style: providedStyles,
}) {
  return (
    <View style={[styles.container, providedStyles]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
