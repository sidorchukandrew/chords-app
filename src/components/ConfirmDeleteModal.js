import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';

import AccentButton from './AccentButton';
import BottomSheetModal from './BottomSheetModal';
import Button from './Button';

export default function ConfirmDeleteModal({
  visible,
  onDismiss,
  message,
  deleting,
  onDelete,
}) {
  const sheetRef = useRef();
  const {text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
    else {
      sheetRef.current?.dismiss();
    }
  }, [visible, sheetRef]);

  function handleCancel() {
    sheetRef.current?.dismiss();
    onDismiss();
  }

  return (
    <BottomSheetModal onDismiss={onDismiss} ref={sheetRef}>
      <Text style={[styles.message, text.primary]}>{message}</Text>
      <View style={styles.buttonsContainer}>
        <AccentButton full style={styles.cancelButton} onPress={handleCancel}>
          Cancel
        </AccentButton>
        <Button
          full
          style={styles.confirmButton}
          loading={deleting}
          onPress={onDelete}>
          Yes, delete
        </Button>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 7,
  },

  confirmButton: {
    marginLeft: 7,
  },
});
