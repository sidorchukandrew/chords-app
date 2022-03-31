import React from 'react';
import {StyleSheet, View} from 'react-native';
import SearchInput from './SearchInput';
import {useTheme} from '../hooks/useTheme';
export default function SearchFilterBar({
  query,
  onQueryChange,
  placeholder,
  ...remainingProps
}) {
  const {border} = useTheme();
  return (
    <View style={styles.centered}>
      <View style={[styles.searchContainer, border.primary]}>
        <SearchInput
          value={query}
          onChange={onQueryChange}
          placeholder={placeholder}
          {...remainingProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    borderBottomWidth: 1,
    maxWidth: 650,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
