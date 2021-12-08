import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchInput from './SearchInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function SearchFilterBar({query, onQueryChange, placeholder}) {
  return (
    <View style={styles.centered}>
      <View style={styles.searchContainer}>
        <SearchInput
          value={query}
          onChange={onQueryChange}
          placeholder={placeholder}
        />
        <Icon name="filter-outline" color="blue" size={18} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    maxWidth: 650,
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
