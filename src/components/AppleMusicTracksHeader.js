import {StyleSheet, View} from 'react-native';
import React from 'react';
import SearchFilterBar from './SearchFilterBar';

export default function AppleMusicTracksHeader({query, onQueryChange}) {
  return (
    <View style={styles.container}>
      <SearchFilterBar query={query} onQueryChange={onQueryChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
