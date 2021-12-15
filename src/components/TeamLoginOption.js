import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';

export default function TeamLoginOption({name, imageUrl, bordered, onPress}) {
  return (
    <View style={bordered && styles.border}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  border: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
});
