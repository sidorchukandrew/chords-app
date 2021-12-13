import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RectButton from './RectButton';

export default function KeyOptionsBottomSheetScreen({navigation}) {
  return (
    <View style={styles.container}>
      <RectButton
        styles={styles.transposeButton}
        onPress={() => navigation.navigate('KeyOptions Transpose')}>
        <Text style={styles.buttonText}>Transpose</Text>
      </RectButton>
      <RectButton
        styles={styles.capoButton}
        onPress={() => navigation.navigate('KeyOptions Capo')}>
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  transposeButton: {
    borderColor: '#eaeaea',
    borderWidth: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
  },
  capoButton: {
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: '#eaeaea',
    width: '100%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
});
