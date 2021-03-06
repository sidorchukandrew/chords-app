import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SearchFilterBar from '../components/SearchFilterBar';
import Container from '../components/Container';
import {useFocusEffect} from '@react-navigation/native';
import {getAllSongs} from '../services/songsService';
import {getAllSetlists} from '../services/setlistsService';
import {getAllBinders} from '../services/bindersService';
import _ from 'lodash';
import NoDataMessage from '../components/NoDataMessage';
import {binderMatches, setlistMatches, songMatches} from '../utils/search';
import ItemSeparator from '../components/ItemSeparator';
import {useTheme} from '../hooks/useTheme';

export default function SearchScreen({navigation}) {
  const {surface, text} = useTheme();
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [setlists, setSetlists] = useState([]);
  const [binders, setBinders] = useState([]);
  const [searchResults, setSearchResults] = useState({
    songs: [],
    binders: [],
    setlists: [],
  });

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        setSongs(await getAllSongs());
        setSetlists(await getAllSetlists());
        setBinders(await getAllBinders());
      }

      fetchData();
      setQuery('');
      setSearchResults({songs: [], binders: [], setlists: []});
    }, []),
  );

  function handleQueryChange(newQuery) {
    debounce(newQuery);
    setQuery(newQuery);
  }

  // eslint-disable-next-line
  const debounce = useCallback(
    _.debounce(
      newQuery => {
        newQuery = newQuery?.toLowerCase() || '';

        function findSongs() {
          return songs?.filter(song => songMatches(song, newQuery)) || [];
        }

        function findBinders() {
          return (
            binders?.filter(binder => binderMatches(binder, newQuery)) || []
          );
        }

        function findSetlists() {
          return (
            setlists?.filter(setlist => setlistMatches(setlist, newQuery)) || []
          );
        }

        if (newQuery !== '') {
          setSearchResults({
            songs: findSongs(),
            binders: findBinders(),
            setlists: findSetlists(),
          });
        }
      },
      [500],
    ),
    [songs, binders, setlists],
  );

  return (
    <ScrollView style={[styles.screen, surface.primary]}>
      <Container size="lg" style={styles.container}>
        <Text style={[styles.dashboardText, text.primary]}>Search</Text>
        <SearchFilterBar
          placeholder="What are you looking for?"
          onQueryChange={handleQueryChange}
          query={query}
        />
        <View style={styles.resultsContainer}>
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitleText, text.primary]}>Songs</Text>
            {searchResults.songs?.length === 0 ? (
              <NoDataMessage message="No songs to show" />
            ) : (
              searchResults.songs?.map((song, index) => (
                <View key={song.id}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => navigation.navigate('Song Detail', song)}>
                    <Text style={text.primary}>{song.name}</Text>
                  </TouchableOpacity>
                  {index < searchResults.songs.length - 1 && <ItemSeparator />}
                </View>
              ))
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitleText, text.primary]}>Binders</Text>
            {searchResults.binders?.length === 0 ? (
              <NoDataMessage message="No binders to show" />
            ) : (
              searchResults.binders?.map((binder, index) => (
                <View key={binder.id}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() =>
                      navigation.navigate('Binder Detail', binder)
                    }>
                    <Text style={text.primary}>{binder.name}</Text>
                  </TouchableOpacity>
                  {index < searchResults.binders.length - 1 && (
                    <ItemSeparator />
                  )}
                </View>
              ))
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitleText, text.primary]}>Sets</Text>
            {searchResults.setlists?.length === 0 ? (
              <NoDataMessage message="No sets to show" />
            ) : (
              searchResults.setlists?.map((set, index) => (
                <View key={set.id}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => navigation.navigate('Setlist Detail', set)}>
                    <Text style={text.primary}>{set.name}</Text>
                  </TouchableOpacity>
                  {index < searchResults.setlists.length - 1 && (
                    <ItemSeparator />
                  )}
                </View>
              ))
            )}
          </View>
        </View>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingVertical: 20,
  },
  resultsContainer: {
    paddingVertical: 10,
  },
  sectionContainer: {
    paddingVertical: 15,
  },
  sectionTitleText: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  resultText: {},
  dashboardText: {
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 20,
  },
});
