import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SpotifyTrackResult({track, onPress, selected}) {
  const [trackWidth, setTrackWidth] = useState(0);
  const {text} = useTheme();

  function getArtworkUrl() {
    return track?.album?.images?.[0]?.url;
  }

  function getArtists() {
    return track?.artists?.map(artist => artist.name)?.join(', ');
  }

  function getTitleWidth() {
    return {
      width: trackWidth - styles.artwork.width - styles.artwork.marginRight,
    };
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(track, !selected)}
      style={[styles.trackButton]}
      onLayout={e => setTrackWidth(e.nativeEvent.layout.width)}>
      {selected && (
        <Icon color="#10b981" name="check" size={20} style={styles.checkIcon} />
      )}
      <Image source={{uri: getArtworkUrl()}} style={styles.artwork} />
      <View>
        <Text
          style={[styles.nameText, text.primary, getTitleWidth()]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {track?.name}
        </Text>
        <Text
          style={[styles.artistText, text.secondary, getTitleWidth()]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {getArtists()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trackButton: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 45,
    height: 45,
    borderRadius: 4,
    marginRight: 10,
  },
  detailsContainer: {},
  nameText: {
    fontSize: 14,
    marginBottom: 2,
  },
  artistText: {
    fontSize: 13,
  },
  checkIcon: {
    marginRight: 10,
  },
});
