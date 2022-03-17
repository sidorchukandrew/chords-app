import {DELETE_SETLISTS, EDIT_SETLISTS} from '../utils/auth';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from './RectButton';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';
import BottomSheet from './BottomSheet';
import {useTheme} from '../hooks/useTheme';

export default function SetlistOptionsBottomSheet({
  visible,
  onDismiss,
  onNavigateTo,
  onDelete,
  isConnected,
}) {
  const sheetRef = useRef();
  const currentMember = useSelector(selectCurrentMember);
  const {text} = useTheme();

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
    onNavigateTo('Edit Setlist Details');
  }

  return (
    <BottomSheet
      snapPoints={['CONTENT_HEIGHT', '20%']}
      onDismiss={onDismiss}
      dynamicHeight
      ref={sheetRef}>
      <View style={styles.sheet}>
        {currentMember.can(EDIT_SETLISTS) && (
          <RectButton
            styles={styles.button}
            onPress={handleEdit}
            disabled={!isConnected}>
            <Icon
              name="pencil"
              size={20}
              color={isConnected ? text.secondary.color : text.disabled.color}
            />
            <Text
              style={[
                styles.buttonText,
                text.secondary,
                !isConnected && text.disabled,
              ]}>
              Edit details
            </Text>
          </RectButton>
        )}
        {currentMember.can(DELETE_SETLISTS) && (
          <RectButton
            styles={styles.button}
            onPress={handleDelete}
            disabled={!isConnected}>
            <Icon
              name="delete"
              size={20}
              color={isConnected ? '#ef4444' : text.disabled.color}
            />
            <Text
              style={[
                styles.buttonText,
                styles.deleteColor,
                !isConnected && text.disabled,
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
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  deleteColor: {
    color: '#ef4444',
  },
});
