import {StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';
import {reportError} from '../utils/error';
import _ from 'lodash';
import SearchTracksApi from '../api/searchTracksApi';
import ItemSeparator from '../components/ItemSeparator';
import NoDataMessage from '../components/NoDataMessage';
import SpotifyTrackResult from '../components/SpotifyTrackResult';
import SearchFilterBar from '../components/SearchFilterBar';
import Button from '../components/Button';
import {pluralize} from '../utils/string';
import LoadingIndicator from '../components/LoadingIndicator';
import {CurrentSongContext} from '../components/AddTracksBottomSheet';
import {addTracksToSong} from '../services/tracksService';

export default function AddSpotifyTrackScreen() {
  const {song, onTracksAdded} = useContext(CurrentSongContext);
  const {surface, isDark} = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(song?.name || '');
  const [loading, setLoading] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await SearchTracksApi.searchSpotify(song?.name);
        setSearchResults(data?.tracks?.items);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    if (song) {
      fetchData();
    }
  }, [song.name]);

  // eslint-disable-next-line
  const debounce = useCallback(
    _.debounce(
      async newQuery => {
        try {
          setLoading(true);
          let {data} = await SearchTracksApi.searchSpotify(newQuery);
          setSearchResults(data?.tracks?.items);
        } catch (error) {
          reportError(error);
        } finally {
          setLoading(false);
        }
      },
      [700],
    ),
    [],
  );

  function handleQueryChange(newQuery) {
    setQuery(newQuery);

    if (newQuery) {
      debounce(newQuery);
    }
  }

  function renderSongRow({item: track}) {
    let selected = !!selectedTracks.find(
      selectedTrack => selectedTrack.id === track.id,
    );
    return (
      <SpotifyTrackResult
        selected={selected}
        track={track}
        onPress={handleToggleTrack}
      />
    );
  }

  function handleToggleTrack(track, isSelected) {
    setSelectedTracks(currentTracks => {
      if (isSelected) {
        return currentTracks.concat(track);
      } else {
        return currentTracks.filter(trackInList => trackInList.id !== track.id);
      }
    });
  }

  async function handleSaveTracks() {
    try {
      let trackRequests = selectedTracks.map(selectedTrack => ({
        source: 'Spotify',
        external_id: selectedTrack.id,
        url: selectedTrack.external_urls?.spotify,
        artwork_url: selectedTrack.album?.images?.[0]?.url,
        name: selectedTrack.name,
      }));

      let tracks = await addTracksToSong(song.id, trackRequests);
      onTracksAdded(tracks);
      setSelectedTracks([]);
    } catch (error) {
      reportError(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.flex}>
      <View
        style={[styles.screen, isDark ? surface.secondary : surface.primary]}>
        <View style={styles.searchContainer}>
          <SearchFilterBar
            query={query}
            onQueryChange={handleQueryChange}
            clearButtonMode="while-editing"
          />
        </View>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            ItemSeparatorComponent={() => <ItemSeparator />}
            data={searchResults}
            renderItem={renderSongRow}
            style={styles.flex}
            ListEmptyComponent={<NoDataMessage message="No songs to show" />}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button
            disabled={selectedTracks.length === 0 || saving}
            onPress={handleSaveTracks}>
            Add {selectedTracks.length} {pluralize(selectedTracks, 'track')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {paddingHorizontal: 15, flex: 1, paddingBottom: 10},
  searchContainer: {
    marginBottom: 8,
  },
  buttonContainer: {
    paddingTop: 10,
  },
  flex: {
    flex: 1,
  },
});
