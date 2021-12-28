import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import RectButton from './RectButton';

export default function KeyOptionsBottomSheetScreen({navigation}) {
  return (
    <View style={styles.container}>
      <RectButton onPress={() => navigation.navigate('KeyOptions Transpose')}>
        <Text style={styles.buttonText}>Transpose</Text>
      </RectButton>
      <RectButton onPress={() => navigation.navigate('KeyOptions Capo')}>
        <Text style={styles.buttonText}>Capo</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: '600',
    color: 'black',
  },
});
