import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import RectButton from '../components/RectButton';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddTracksBottomSheetScreen({navigation}) {
  const {text} = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <RectButton
        styles={styles.sourceButton}
        onPress={() => navigation.push('Add Apple Music Tracks')}>
        <View style={styles.iconTextContainer}>
          <Image
            style={styles.appleMusicIcon}
            source={require('../img/apple_music_icon.png')}
          />

          <Text style={[styles.sourceButtonText, text.primary]}>
            Apple Music
          </Text>
        </View>

        <Icon name="chevron-right" size={18} color={text.primary.color} />
      </RectButton>

      <RectButton
        styles={styles.sourceButton}
        onPress={() => navigation.push('Add Spotify Tracks')}>
        <View style={styles.iconTextContainer}>
          <Image
            style={styles.appleMusicIcon}
            source={require('../img/spotify_icon.png')}
          />

          <Text style={[styles.sourceButtonText, text.primary]}>Spotify</Text>
        </View>

        <Icon name="chevron-right" size={18} color={text.primary.color} />
      </RectButton>

      <RectButton
        styles={styles.sourceButton}
        onPress={() => navigation.push('Add YouTube Tracks')}>
        <View style={styles.iconTextContainer}>
          <Image
            style={styles.youtubeIcon}
            source={require('../img/youtube_icon.png')}
          />

          <Text style={[styles.sourceButtonText, text.primary]}>YouTube</Text>
        </View>

        <Icon name="chevron-right" size={18} color={text.primary.color} />
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {padding: 15, flex: 1},
  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sourceButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  appleMusicIcon: {
    width: 25,
    height: 25,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  youtubeIcon: {
    width: 25,
    height: 18,
  },
});
