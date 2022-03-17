import {StyleSheet, Text, View} from 'react-native';

import KeyOptionButton from './KeyOptionButton';
import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function CapoOption({capo, onPress, selected}) {
  const {text} = useTheme();

  return (
    <View style={styles.container}>
      <KeyOptionButton
        selected={selected}
        onPress={() => onPress(capo.capoKey)}
        style={{marginRight: 0}}>
        {capo.capoKey}
      </KeyOptionButton>
      <Text style={[styles.capoNumber, text.primary]}>{capo.capoNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  capoNumber: {
    marginTop: 7,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  container: {
    marginRight: 10,
  },
});
