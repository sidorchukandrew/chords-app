import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function SetlistNavigation({onNext, onBack, songs, songIndex}) {
  const {border, text} = useTheme();

  function hasPrevious() {
    return songIndex > 0;
  }

  function hasNext() {
    return songIndex < songs.length - 1;
  }

  function getNextSongName() {
    return hasNext() ? songs[songIndex + 1].name : 'End';
  }

  function getPreviousSongName() {
    return hasPrevious() ? songs[songIndex - 1].name : 'Beginning';
  }

  return (
    <View style={[styles.buttonsContainer, border.primary]}>
      <TouchableOpacity
        style={styles.button}
        disabled={!hasPrevious()}
        onPress={onBack}>
        <Text
          style={[
            styles.buttonText,
            text.primary,
            !hasPrevious() && text.disabled,
          ]}
          ellipsizeMode="tail"
          numberOfLines={2}>
          {getPreviousSongName()}
        </Text>
      </TouchableOpacity>
      <View style={[styles.leftBorder, border.primary, styles.button]}>
        <TouchableOpacity
          onPress={onNext}
          disabled={!hasNext()}
          style={[styles.button, {width: '100%'}]}>
          <Text
            style={[
              styles.buttonText,
              text.primary,
              !hasNext() && text.disabled,
            ]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {getNextSongName()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  button: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
  },
  leftBorder: {
    borderLeftWidth: 1,
  },
});
