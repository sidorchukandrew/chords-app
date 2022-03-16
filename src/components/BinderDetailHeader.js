import {StyleSheet, Text, View} from 'react-native';

import BinderColorSwatch from './BinderColorSwatch';
import React from 'react';
import SearchFilterBar from './SearchFilterBar';
import {useTheme} from '../hooks/useTheme';

export default function BinderDetailHeader({binder, query, onQueryChange}) {
  const {text} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.colorTitleContainer}>
        {Boolean(binder?.color) && (
          <BinderColorSwatch color={binder?.color} style={{marginRight: 10}} />
        )}
        <Text style={[styles.title, text.primary]}>{binder?.name}</Text>
      </View>
      <Text style={[styles.description, text.secondary]}>
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
    marginTop: 10,
    marginBottom: 40,
  },
  container: {
    marginBottom: 15,
  },
});
