import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppleMusicTrackResult({track, onPress, selected}) {
  const {text} = useTheme();

  function getArtworkUrl() {
    let url = track?.attributes?.artwork?.url;

    url = url.replace('{w}', 100);
    url = url.replace('{h}', 100);

    return url;
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(track, !selected)}
      style={styles.trackButton}>
      {selected && (
        <Icon color="#10b981" name="check" size={20} style={styles.checkIcon} />
      )}
      <Image source={{uri: getArtworkUrl()}} style={styles.artwork} />
      <View>
        <Text style={[styles.nameText, text.primary]}>
          {track?.attributes?.name}
        </Text>
        <Text style={[styles.artistText, text.secondary]}>
          {track?.attributes?.artistName}
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
