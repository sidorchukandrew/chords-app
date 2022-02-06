import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BottomSheet from './BottomSheet';
import RectButton from './RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NoteOptionsBottomSheet({
  visible,
  onDismiss,
  onChangeColor,
  onDelete,
  isConnected,
}) {
  const sheetRef = useRef();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleShowChangeColorSheet() {
    onChangeColor();
    sheetRef.current?.dismiss();
    onDismiss();
  }

  function handleDelete() {
    onDelete();
    sheetRef.current?.dismiss();
    onDismiss();
  }

  return (
    <BottomSheet
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight
      onDismiss={onDismiss}
      ref={sheetRef}>
      <View style={styles.sheet}>
        <RectButton
          styles={styles.button}
          onPress={handleShowChangeColorSheet}
          disabled={!isConnected}>
          <Icon
            name="palette"
            size={22}
            color={isConnected ? '#505050' : '#d0d0d0'}
          />
          <Text
            style={[styles.buttonText, !isConnected && styles.disabledColor]}>
            Change color
          </Text>
        </RectButton>

        <RectButton
          styles={styles.button}
          onPress={handleDelete}
          disabled={!isConnected}>
          <Icon
            name="delete"
            size={20}
            color={isConnected ? '#ef4444' : '#d0d0d0'}
          />
          <Text
            style={[
              styles.buttonText,
              styles.deleteColo,
              !isConnected && styles.disabledColor,
            ]}>
            Delete
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
