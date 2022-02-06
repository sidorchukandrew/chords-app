import {DELETE_BINDERS, EDIT_BINDERS} from '../utils/auth';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BottomSheet from './BottomSheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from './RectButton';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';

export default function BinderOptionsBottomSheet({
  visible,
  onDismiss,
  onNavigateTo,
  onDelete,
  isConnected,
}) {
  const sheetRef = useRef();
  const currentMember = useSelector(selectCurrentMember);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleDelete() {
    sheetRef.current?.dismiss();
    onDismiss();
    onDelete();
  }

  function handleEdit() {
    sheetRef.current?.dismiss();
    onDismiss();
    onNavigateTo('Edit Binder Details');
  }

  return (
    <BottomSheet
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight
      onDismiss={onDismiss}
      ref={sheetRef}>
      <View style={styles.sheet}>
        {currentMember.can(EDIT_BINDERS) && (
          <RectButton
            styles={styles.button}
            onPress={handleEdit}
            disabled={!isConnected}>
            <Icon
              name="pencil"
              size={20}
              color={isConnected ? '#505050' : '#d0d0d0'}
            />
            <Text
              style={[styles.buttonText, !isConnected && styles.disabledColor]}>
              Edit
            </Text>
          </RectButton>
        )}
        {currentMember.can(DELETE_BINDERS) && (
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
                styles.deleteColor,
                !isConnected && styles.disabledColor,
              ]}>
              Delete
            </Text>
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
  disabledColor: {
    color: '#d0d0d0',
  },
});
