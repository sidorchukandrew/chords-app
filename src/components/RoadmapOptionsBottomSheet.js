import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BottomSheet from './BottomSheet';
import RectButton from './RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RoadmapOptionsBottomSheet({
  visible,
  onDismiss,
  onDeleteSection,
  onEditSection,
  onRearrangeSections,
}) {
  const sheetRef = useRef();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleDelete() {
    onDeleteSection();
    sheetRef.current?.dismiss();
    onDismiss();
  }

  function handleEdit() {
    onEditSection();
    sheetRef.current?.dismiss();
    onDismiss();
  }

  function handleRearrangeSections() {
    onRearrangeSections();
    sheetRef.current?.dismiss();
    onDismiss();
  }

  return (
    <BottomSheet
      onDismiss={onDismiss}
      dynamicHeight
      snapPoints={['CONTENT_HEIGHT']}
      ref={sheetRef}>
      <View style={styles.sheet}>
        <RectButton styles={styles.button} onPress={handleRearrangeSections}>
          <Icon size={22} color="#505050" name="swap-horizontal" />
          <Text style={styles.buttonText}>Rearrange</Text>
        </RectButton>

        <RectButton styles={styles.button} onPress={handleEdit}>
          <Icon size={20} color="#505050" name="pencil" />
          <Text style={styles.buttonText}>Edit</Text>
        </RectButton>

        <RectButton styles={styles.button} onPress={handleDelete}>
          <Icon size={20} color="#ef4444" name="delete" />
          <Text style={[styles.buttonText, styles.deleteColor]}>Remove</Text>
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
