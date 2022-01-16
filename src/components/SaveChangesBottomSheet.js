import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AccentButton from './AccentButton';
import BottomSheet from './BottomSheet';
import Button from './Button';

export default function SaveChangesBottomSheet({
  visible,
  onDismiss,
  onCancel,
  onSave,
  saving,
}) {
  const sheetRef = useRef();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
    else {
      sheetRef.current?.dismiss();
    }
  }, [visible, sheetRef]);

  return (
    <BottomSheet onDismiss={onDismiss} ref={sheetRef}>
      <View style={styles.container}>
        <Text style={styles.title}>You have unsaved changes for this song</Text>
        <Button style={styles.saveButton} loading={saving} onPress={onSave}>
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
    color: 'black',
    marginBottom: 20,
  },
  container: {
    padding: 10,
    flex: 1,
  },
  saveButton: {
    marginBottom: 5,
  },
  filler: {
    flex: 1,
  },
});
