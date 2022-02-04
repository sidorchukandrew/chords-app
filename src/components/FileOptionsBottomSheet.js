import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';
import BottomSheet from './BottomSheet';
import {DELETE_FILES, EDIT_FILES} from '../utils/auth';
import RectButton from './RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FileOptionsBottomSheet({
  visible,
  onDismiss,
  file,
  onDelete,
  onRename,
}) {
  const sheetRef = useRef();
  const currentMember = useSelector(selectCurrentMember);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleRename() {
    sheetRef.current?.dismiss();
    onDismiss();
    onRename();
  }

  function handleDelete() {
    sheetRef.current?.dismiss();
    onDismiss();
    onDelete(file);
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight
      onDismiss={onDismiss}>
      <View style={styles.sheet}>
        {currentMember.can(EDIT_FILES) && (
          <RectButton styles={styles.button} onPress={handleRename}>
            <Icon name="pencil" size={20} color="#505050" />
            <Text style={styles.buttonText}>Rename</Text>
          </RectButton>
        )}
        {currentMember.can(DELETE_FILES) && (
          <RectButton styles={styles.button} onPress={handleDelete}>
            <Icon name="delete" size={20} color="#ef4444" />
            <Text style={[styles.buttonText, styles.deleteColor]}>Delete</Text>
          </RectButton>
        )}
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
