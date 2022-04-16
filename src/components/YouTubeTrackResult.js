import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function YouTubeTrackResult({track, onPress, selected}) {
  const [trackWidth, setTrackWidth] = useState(0);
  const {text} = useTheme();

  function getThumbnailUrl() {
    return (
      track?.snippet?.thumbnails?.standard?.url ||
      track?.snippet?.thumbnails?.default?.url
    );
  }

  function getTitleWidth() {
    return {
      width:
        trackWidth - styles.thumbnail.width - styles.thumbnail.marginRight - 10,
    };
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(track, !selected)}
      style={styles.trackButton}
      onLayout={e => setTrackWidth(e.nativeEvent.layout.width)}>
      {selected && (
        <Icon color="#10b981" name="check" size={20} style={styles.checkIcon} />
      )}
      <Image source={{uri: getThumbnailUrl()}} style={styles.thumbnail} />
      <View>
        <Text
          style={[styles.nameText, text.primary, getTitleWidth()]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {track?.snippet?.title}
        </Text>
        <Text
          style={[styles.channelText, text.secondary, getTitleWidth()]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {track?.snippet?.channelTitle}
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
  thumbnail: {
    width: 125,
    height: 68,

    marginRight: 10,
  },
  detailsContainer: {},
  nameText: {
    fontSize: 14,
    marginBottom: 2,
  },
  channelText: {
    fontSize: 13,
  },
  checkIcon: {
    marginRight: 10,
  },
});
