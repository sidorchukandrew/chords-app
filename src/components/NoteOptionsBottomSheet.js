import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BottomSheet from './BottomSheet';
import RectButton from './RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NoteOptionsBottomSheet({
  visible,
  onDismiss,
  note,
  onChangeColor,
  onDelete,
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
        <RectButton styles={styles.button} onPress={handleShowChangeColorSheet}>
          <Icon name="palette" size={22} color="#505050" />
          <Text style={styles.buttonText}>Change color</Text>
        </RectButton>

        <RectButton styles={styles.button} onPress={handleDelete}>
          <Icon name="delete" size={20} color="#ef4444" />
          <Text style={[styles.buttonText, styles.deleteColor]}>Delete</Text>
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
});
