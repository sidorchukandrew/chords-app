import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../hooks/useTheme';
import TrackOptionsBottomSheet from './TrackOptionsBottomSheet';

export default function Track({song, track, onRemoved}) {
  const {text} = useTheme();
  const [optionsVisible, setOptionsVisible] = useState(false);

  function icon() {
    if (track.source === 'Apple Music') {
      return (
        <Image
          source={require('../img/apple_music_icon.png')}
          style={[styles.appleMusicIcon, styles.sourceIcon]}
        />
      );
    } else if (track.source === 'Spotify') {
      return (
        <Image
          source={require('../img/spotify_icon.png')}
          style={[styles.appleMusicIcon, styles.sourceIcon]}
        />
      );
    } else if (track.source === 'YouTube') {
      return (
        <Image
          source={require('../img/youtube_icon.png')}
          style={[styles.youtubeIcon, styles.sourceIcon]}
        />
      );
    }
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOptionsVisible(true)}>
        <Image source={{uri: track.artwork_url}} style={styles.artwork} />
        {icon()}
        <Text style={[text.primary, styles.nameText]}>{track.name}</Text>
      </TouchableOpacity>
      <TrackOptionsBottomSheet
        track={track}
        visible={optionsVisible}
        onDismiss={() => setOptionsVisible(false)}
        onRemoved={onRemoved}
        song={song}
      />
    </>
  );
}

const styles = StyleSheet.create({
  artwork: {
    width: 140,
    height: 140,
    borderRadius: 4,
    marginBottom: 5,
  },
  nameText: {
    fontSize: 12,
    width: 120,
  },
  button: {
    marginRight: 13,
  },
  sourceIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  appleMusicIcon: {
    width: 22,
    height: 22,
  },
  youtubeIcon: {
    width: 24,
    height: 17,
  },
});
