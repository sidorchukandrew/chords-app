import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';
import {reportError} from '../utils/error';
import _ from 'lodash';
import SearchTracksApi from '../api/searchTracksApi';
import ItemSeparator from '../components/ItemSeparator';
import NoDataMessage from '../components/NoDataMessage';
import SearchFilterBar from '../components/SearchFilterBar';
import YouTubeTrackResult from '../components/YouTubeTrackResult';
import LoadingIndicator from '../components/LoadingIndicator';
import {pluralize} from '../utils/string';
import Button from '../components/Button';
import {CurrentSongContext} from '../components/AddTracksBottomSheet';
import {addTracksToSong} from '../services/tracksService';

export default function YouTubeTrackScreen() {
  const {song, onTracksAdded} = useContext(CurrentSongContext);
  const {surface, isDark} = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(() => {
    return song?.name ? `${song.name} ${song.artist || ''}` : '';
  });
  const [loading, setLoading] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await SearchTracksApi.searchYouTube(
          `${song.name} ${song.artist || ''}`,
        );
        setSearchResults(data?.items);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    if (song) {
      fetchData();
    }
  }, [song.name, song.artist]);

  // eslint-disable-next-line
  const debounce = useCallback(
    _.debounce(
      async newQuery => {
        try {
          setLoading(true);
          let {data} = await SearchTracksApi.searchYouTube(newQuery);
          setSearchResults(data?.items);
        } catch (error) {
          reportError(error);
        } finally {
          setLoading(false);
        }
      },
      [1000],
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
      selectedTrack => selectedTrack.id?.videoId === track.id?.videoId,
    );
    return (
      <YouTubeTrackResult
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
        return currentTracks.filter(
          trackInList => trackInList.id?.videoId !== track.id?.videoId,
        );
      }
    });
  }

  async function handleSaveTracks() {
    try {
      let trackRequests = selectedTracks.map(selectedTrack => ({
        source: 'YouTube',
        external_id: selectedTrack.id?.videoId,
        url: `https://www.youtube.com/watch/${selectedTrack.id?.videoId}`,
        artwork_url:
          selectedTrack?.snippet?.thumbnails?.standard?.url ||
          selectedTrack?.snippet?.thumbnails?.default?.url,
        name: selectedTrack.snippet?.title,
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
            keyExtractor={item => item.id?.videoId}
            ListEmptyComponent={<NoDataMessage message="No results to show" />}
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
