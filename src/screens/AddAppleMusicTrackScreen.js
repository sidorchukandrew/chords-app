import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';
import {reportError} from '../utils/error';
import _ from 'lodash';
import SearchTracksApi from '../api/searchTracksApi';
import AppleMusicTrackResult from '../components/AppleMusicTrackResult';
import ItemSeparator from '../components/ItemSeparator';
import NoDataMessage from '../components/NoDataMessage';
import SearchFilterBar from '../components/SearchFilterBar';
import LoadingIndicator from '../components/LoadingIndicator';
import {pluralize} from '../utils/string';
import Button from '../components/Button';
import {CurrentSongContext} from '../components/AddTracksBottomSheet';
import {addTracksToSong} from '../services/tracksService';

export default function AddAppleMusicTrackScreen() {
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
        let {data} = await SearchTracksApi.searchAppleMusic(song.name);
        setSearchResults(data?.results?.songs?.data);
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
          let {data} = await SearchTracksApi.searchAppleMusic(newQuery);
          setSearchResults(data?.results?.songs?.data);
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
      <AppleMusicTrackResult
        track={track}
        selected={selected}
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
      let trackRequests = selectedTracks.map(selectedTrack => {
        let artworkUrl = selectedTrack?.attributes?.artwork?.url;

        artworkUrl = artworkUrl.replace('{w}', 400);
        artworkUrl = artworkUrl.replace('{h}', 400);

        return {
          source: 'Apple Music',
          external_id: selectedTrack.id,
          url: selectedTrack.attributes?.url,
          artwork_url: artworkUrl,
          name: selectedTrack.attributes?.name,
        };
      });

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
