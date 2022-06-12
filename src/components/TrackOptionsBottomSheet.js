import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BottomSheet from './BottomSheet';
import RectButton from './RectButton';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {EDIT_SONGS} from '../utils/auth';
import {removeTrackFromSong} from '../services/tracksService';
import {reportError} from '../utils/error';

export default function TrackOptionsBottomSheet({
  song,
  track,
  visible,
  onDismiss,
  onRemoved,
}) {
  const sheetRef = useRef();
  const {text} = useTheme();
  const currentMember = useSelector(selectCurrentMember);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleOpenLink() {
    Linking.openURL(track.url);
  }

  async function handleDelete() {
    try {
      await removeTrackFromSong(song.id, track.id);
      onRemoved(track);
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
        <RectButton styles={styles.button} onPress={handleOpenLink}>
          <Icon name="play-circle" size={20} color={text.secondary.color} />
          <Text style={[styles.buttonText, text.secondary]}>
            Listen on {track.source}
          </Text>
        </RectButton>
        {currentMember.can(EDIT_SONGS) && (
          <RectButton styles={styles.button} onPress={handleDelete}>
            <Icon name="delete" size={20} color="#ef4444" />
            <Text style={[styles.buttonText, styles.deleteColor]}>Remove</Text>
          </RectButton>
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    padding: 15,
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
