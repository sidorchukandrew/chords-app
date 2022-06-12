import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

import AccentButton from './AccentButton';
import BottomSheet from './BottomSheet';
import Button from './Button';

export default function SaveChangesBottomSheet({
  visible,
  onDismiss,
  onCancel,
  onSave,
  saving,
  isConnected,
}) {
  const sheetRef = useRef();
  const {text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
    else {
      sheetRef.current?.dismiss();
    }
  }, [visible, sheetRef]);

  return (
    <BottomSheet
      onDismiss={onDismiss}
      ref={sheetRef}
      dynamicHeight
      snapPoints={['CONTENT_HEIGHT']}>
      <View style={styles.container}>
        <Text style={[styles.title, text.primary]}>
          You have unsaved changes for this song
        </Text>
        <Button
          style={styles.saveButton}
          loading={saving}
          onPress={onSave}
          disabled={!isConnected}>
          Save now
        </Button>
        <AccentButton onPress={onCancel}>Cancel</AccentButton>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 20,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  saveButton: {
    marginBottom: 8,
  },
  filler: {
    flex: 1,
  },
});
