import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AccentButton from './AccentButton';
import Button from './Button';

export default function ConfirmCancelButtons({onCancel, onConfirm}) {
  return (
    <View style={styles.actionsContainer}>
      <AccentButton full style={styles.cancelButton} onPress={onCancel}>
        Cancel
      </AccentButton>
      <Button full style={styles.confirmButton} onPress={onConfirm}>
        Confirm
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 6,
  },
  confirmButton: {
    marginLeft: 6,
  },
});
