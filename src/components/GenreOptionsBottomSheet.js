import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BottomSheet from './BottomSheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from './RectButton';
import {removeGenreFromSong} from '../services/songsService';
import {reportError} from '../utils/error';

export default function GenreOptionsBottomSheet({
  visible,
  onDismiss,
  onGenreRemoved,
  genre,
  song,
  isConnected,
}) {
  const sheetRef = useRef();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  async function handleRemoveGenre() {
    try {
      await removeGenreFromSong(genre.id, song.id);
      onGenreRemoved(genre);
      sheetRef.current?.dismiss();
      onDismiss();
    } catch (error) {
      reportError(error);
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight
      onDismiss={onDismiss}>
      <View style={styles.sheet}>
        <RectButton
          styles={styles.button}
          onPress={handleRemoveGenre}
          disabled={!isConnected}>
          <Icon
            name="delete"
            size={20}
            color={isConnected ? '#ef4444' : '#d0d0d0'}
          />
          <Text
            style={[
              styles.buttonText,
              styles.deleteColor,
              !isConnected && styles.disabledColor,
            ]}>
            Remove
          </Text>
        </RectButton>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#505050',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  deleteColor: {
    color: '#ef4444',
  },
  disabledColor: {
    color: '#d0d0d0',
  },
});
