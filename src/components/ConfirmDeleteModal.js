import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

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

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleCancel() {
    sheetRef.current?.dismiss();
    onDismiss();
  }

  return (
    <BottomSheetModal onDismiss={onDismiss} ref={sheetRef}>
      <Text style={styles.message}>{message}</Text>
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
    color: 'black',
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
