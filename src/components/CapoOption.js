import {StyleSheet, Text, View} from 'react-native';

import KeyOptionButton from './KeyOptionButton';
import React from 'react';

export default function CapoOption({capo, onPress, selected}) {
  return (
    <View style={styles.container}>
      <KeyOptionButton
        selected={selected}
        onPress={() => onPress(capo.capoKey)}
        style={{marginRight: 0}}>
        {capo.capoKey}
      </KeyOptionButton>
      <Text style={styles.capoNumber}>{capo.capoNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  capoNumber: {
    marginTop: 7,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  container: {
    marginRight: 10,
  },
});
