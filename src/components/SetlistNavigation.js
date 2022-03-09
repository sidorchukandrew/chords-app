import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function SetlistNavigation({onNext, onBack, songs, songIndex}) {
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
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.button}
        disabled={!hasPrevious()}
        onPress={onBack}>
        <Text
          style={[styles.buttonText, !hasPrevious() && styles.disabledColor]}>
          {getPreviousSongName()}
        </Text>
      </TouchableOpacity>
      <View style={[styles.leftBorder, styles.button]}>
        <TouchableOpacity
          onPress={onNext}
          disabled={!hasNext()}
          style={[styles.button, {width: '100%'}]}>
          <Text style={[styles.buttonText, !hasNext() && styles.disabledColor]}>
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
    borderTopColor: '#eaeaea',
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
    color: 'black',
  },
  disabledColor: {
    color: '#d0d0d0',
  },
  leftBorder: {
    borderLeftColor: '#eaeaea',
    borderLeftWidth: 1,
  },
});
