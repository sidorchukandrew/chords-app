import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function TransposeBottomSheetScreen() {
  return (
    <View style={styles.container}>
      <Text>Transpose</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
