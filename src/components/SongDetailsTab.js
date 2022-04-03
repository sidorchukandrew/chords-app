import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Detail from './Detail';
import Divider from './Divider';
import {EDIT_SONGS} from '../utils/auth';
import GenreOptionsBottomSheet from './GenreOptionsBottomSheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Section from './Section';
import Tag from './Tag';
import ThemeOptionsBottomSheet from './ThemeOptionsBottomSheet';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {useTheme} from '../hooks/useTheme';
import AddTracksBottomSheet from './AddTracksBottomSheet';
import Track from './Track';

export default function SongDetailsTab({
  song,
  onNavigateTo,
  onUpdateSong,
  navigation,
  isConnected,
}) {
  const [genreOptionsVisible, setGenreOptionsVisible] = useState(false);
  const [genreBeingViewed, setGenreBeingViewed] = useState();
  const [themeOptionsVisible, setThemeOptionsVisible] = useState(false);
  const [themeBeingViewed, setThemeBeingViewed] = useState();
  const currentMember = useSelector(selectCurrentMember);
  const [addTracksVisible, setAddTracksVisible] = useState(false);
  const {text, blue} = useTheme();

  function handleOpenGenreOptionsSheet(genre) {
    if (currentMember.can(EDIT_SONGS)) {
      setGenreBeingViewed(genre);
      setGenreOptionsVisible(true);
    }
  }

  function handleOpenThemeOptionsSheet(theme) {
    if (currentMember.can(EDIT_SONGS)) {
      setThemeBeingViewed(theme);
      setThemeOptionsVisible(true);
    }
  }

  function handleGenreRemoved(removedGenre) {
    let updatedGenres = song.genres?.filter(
      genre => genre.id !== removedGenre.id,
    );
    onUpdateSong({genres: updatedGenres});
  }

  function handleThemeRemoved(removedTheme) {
    let updatedThemes = song.themes?.filter(
      theme => theme.id !== removedTheme.id,
    );
    onUpdateSong({themes: updatedThemes});
  }

  function handleTrackRemoved(removedTrack) {
    let updatedTracks = song.tracks?.filter(
      track => track.id !== removedTrack.id,
    );
    onUpdateSong({tracks: updatedTracks});
  }

  function handleTracksAdded(addedTracks) {
    let updatedTracks = song.tracks?.concat(addedTracks);
    onUpdateSong({tracks: updatedTracks});
  }

  return (
    <ScrollView>
      <Section
        title="Details"
        button={
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => onNavigateTo('Edit Song Details')}
            disabled={!isConnected}>
            <Text
              style={[
                styles.editButtonText,
                blue.text,
                !isConnected && text.disabled,
              ]}>
              Edit
            </Text>
          </TouchableOpacity>
        }
        showButton={currentMember.can(EDIT_SONGS)}>
        <Detail title="Original Key" data={song.original_key} border />
        <Detail title="Transposed" data={song.transposed_key} border />
        <Detail title="Artist" data={song.artist} border />
        <Detail title="BPM" data={song.bpm} border />
        <Detail title="Meter" data={song.meter} />
      </Section>
      <Divider size="lg" />
      <Section
        title="Tracks"
        showButton={currentMember.can(EDIT_SONGS)}
        button={
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => setAddTracksVisible(true)}
            disabled={!isConnected}>
            <Icon
              color={isConnected ? blue.text.color : text.disabled}
              size={20}
              name="plus"
            />
          </TouchableOpacity>
        }>
        <ScrollView horizontal>
          {song.tracks?.map(track => (
            <Track
              key={track.id}
              song={song}
              track={track}
              onRemoved={handleTrackRemoved}
            />
          ))}
        </ScrollView>
      </Section>
      <Divider size="lg" />
      <Section
        title="Themes"
        showButton={currentMember.can(EDIT_SONGS)}
        button={
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => onNavigateTo('Add Theme')}
            disabled={!isConnected}>
            <Icon
              color={isConnected ? blue.text.color : text.disabled}
              size={20}
              name="plus"
            />
          </TouchableOpacity>
        }>
        <ScrollView horizontal style={styles.listContainer}>
          {song.themes?.map(theme => (
            <Tag
              key={theme.id}
              tag={theme.name}
              style={styles.tag}
              onPress={() => handleOpenThemeOptionsSheet(theme)}
            />
          ))}
        </ScrollView>
      </Section>
      <Divider size="lg" />
      <Section
        title="Genres"
        button={
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => onNavigateTo('Add Genre')}
            disabled={!isConnected}>
            <Icon
              color={isConnected ? blue.text.color : '#d0d0d0'}
              size={20}
              name="plus"
            />
          </TouchableOpacity>
        }
        showButton={currentMember.can(EDIT_SONGS)}>
        <ScrollView horizontal style={styles.listContainer}>
          {song.genres?.map(genre => (
            <Tag
              key={genre.id}
              tag={genre.name}
              style={styles.tag}
              onPress={() => handleOpenGenreOptionsSheet(genre)}
            />
          ))}
        </ScrollView>
      </Section>
      <Divider size="lg" />
      <Section title="Binders">
        <ScrollView horizontal style={styles.listContainer}>
          {song.binders?.map(binder => (
            <Tag
              key={binder.id}
              tag={binder.name}
              style={styles.binderTag}
              textStyle={styles.binderTagText}
              onPress={() => navigation.push('Binder Detail', binder)}
            />
          ))}
        </ScrollView>
      </Section>
      <GenreOptionsBottomSheet
        visible={genreOptionsVisible}
        onDismiss={() => setGenreOptionsVisible(false)}
        genre={genreBeingViewed}
        song={song}
        onGenreRemoved={handleGenreRemoved}
        isConnected={isConnected}
      />
      <ThemeOptionsBottomSheet
        visible={themeOptionsVisible}
        onDismiss={() => setThemeOptionsVisible(false)}
        theme={themeBeingViewed}
        song={song}
        onThemeRemoved={handleThemeRemoved}
        isConnected={isConnected}
      />
      <AddTracksBottomSheet
        visible={addTracksVisible}
        onDismiss={() => setAddTracksVisible(false)}
        song={song}
        onTracksAdded={handleTracksAdded}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tag: {
    marginRight: 10,
  },
  listContainer: {
    marginBottom: 10,
  },
  binderTag: {
    marginRight: 10,
    backgroundColor: '#0969da',
  },
  binderTagText: {
    color: 'white',
  },
  editButtonText: {
    fontWeight: '600',
  },
  plusButton: {
    padding: 5,
  },
});
