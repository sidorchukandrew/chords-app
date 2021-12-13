import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function CapoBottomSheetScreen() {
  return (
    <View style={styles.container}>
      <Text>Capo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
