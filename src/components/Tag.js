import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Tag({tag, style: providedStyles, textStyle}) {
  return (
    <TouchableOpacity style={[styles.tagContainer, providedStyles]}>
      <Text style={[styles.tagText, textStyle]}>{tag}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: '#ddf4ff',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  tagText: {
    color: '#0969da',
    fontWeight: '600',
  },
});
