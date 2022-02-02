import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SearchFilterBar from '../components/SearchFilterBar';
import Container from '../components/Container';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  return (
    <SafeAreaView style={styles.screen}>
      <Container size="lg" style={styles.container}>
        <SearchFilterBar
          placeholder="What are you looking for?"
          onQueryChange={setQuery}
          query={query}
        />
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    paddingVertical: 20,
  },
});
