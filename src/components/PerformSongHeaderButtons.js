import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Button from './Button';
import {getPreferredKey, hasAnyKeysSet} from '../utils/song';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PerformSongHeaderButtons({
  song,
  toggleKeyOptionsVisible,
  toggleAdjustmentsSheetVisible,
  toggleToolsSheetVisible,
}) {
  const {blue} = useTheme();

  return (
    <View style={styles.headerButtonsContainer}>
      {hasAnyKeysSet(song) && (
        <Button
          style={[styles.songKeyButton, styles.rightMargin]}
          onPress={() => toggleKeyOptionsVisible(true)}>
          {getPreferredKey(song)}
        </Button>
      )}
      <TouchableOpacity
        style={[styles.adjustmentsButton, styles.rightMargin]}
        onPress={() => toggleAdjustmentsSheetVisible(true)}>
        <Icon name="tune-vertical" size={22} color={blue.text.color} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.adjustmentsButton}
        onPress={() => toggleToolsSheetVisible(true)}>
        <Icon name="hammer-wrench" size={22} color={blue.text.color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  adjustmentsButton: {
    padding: 3,
  },
  rightMargin: {
    marginRight: 15,
  },
  songKeyButton: {
    height: 35,
    width: 35,
    borderRadius: 8,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 150,
  },
});
