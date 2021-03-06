import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BottomSheet from './BottomSheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from './RectButton';
import {removeThemeFromSong} from '../services/songsService';
import {reportError} from '../utils/error';
import {useTheme} from '../hooks/useTheme';

export default function ThemeOptionsBottomSheet({
  visible,
  onDismiss,
  onThemeRemoved,
  theme,
  song,
  isConnected,
}) {
  const sheetRef = useRef();
  const {text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  async function handleRemoveTheme() {
    try {
      await removeThemeFromSong(theme.id, song.id);
      onThemeRemoved(theme);
      sheetRef.current?.dismiss();
      onDismiss();
    } catch (error) {
      reportError(error);
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      onDismiss={onDismiss}
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight>
      <View style={styles.sheet}>
        <RectButton
          styles={styles.button}
          onPress={handleRemoveTheme}
          disabled={!isConnected}>
          <Icon
            name="delete"
            size={20}
            color={isConnected ? '#ef4444' : text.disabled.color}
          />
          <Text
            style={[
              styles.buttonText,
              styles.deleteColor,
              !isConnected && text.disabled,
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
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  deleteColor: {
    color: '#ef4444',
  },
});
