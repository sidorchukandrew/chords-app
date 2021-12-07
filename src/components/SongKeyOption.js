import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function SongKeyOption({songKey, onPress, selected}) {
  return (
    <TouchableOpacity
      disabled={!songKey}
      style={[styles.keyOption, selected && styles.selected]}
      onPress={() => onPress?.(songKey)}>
      <Text style={[styles.keyOptionText, selected && styles.selectedText]}>
        {songKey}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  keyOption: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#eaeaea',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  keyOptionText: {
    fontWeight: '600',
    fontSize: 18,
  },
  selected: {
    backgroundColor: '#2464eb',
  },
  selectedText: {
    color: 'white',
  },
});
