import {StyleSheet, Text, View} from 'react-native';

import BinderColorSwatch from './BinderColorSwatch';
import React from 'react';
import SearchFilterBar from './SearchFilterBar';

export default function BinderDetailHeader({binder, query, onQueryChange}) {
  return (
    <View style={styles.container}>
      <View style={styles.colorTitleContainer}>
        {Boolean(binder?.color) && (
          <BinderColorSwatch color={binder?.color} style={{marginRight: 10}} />
        )}
        <Text style={styles.title}>{binder?.name}</Text>
      </View>
      <Text style={styles.description}>
        {binder?.description || 'No description provided yet'}
      </Text>
      <SearchFilterBar
        placeholder={`Search ${binder?.songs?.length} songs`}
        query={query}
        onQueryChange={onQueryChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
  },
  colorTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#404040',
    marginTop: 10,
    marginBottom: 40,
  },
  container: {
    marginBottom: 0,
  },
});
