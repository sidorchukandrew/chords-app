import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BottomSheet from './BottomSheet';
import {DELETE_SONGS} from '../utils/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from './RectButton';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {useTheme} from '../hooks/useTheme';

export default function SongOptionsBottomSheet({
  visible,
  onDismiss,
  onDelete,
  onPrint,
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

  function handlePrint() {
    onPrint();
    sheetRef.current?.dismiss();
    onDismiss();
  }

  return (
    <>
      <BottomSheet
        snapPoints={['CONTENT_HEIGHT']}
        dynamicHeight
        onDismiss={onDismiss}
        ref={sheetRef}>
        <View style={styles.sheet}>
          <RectButton styles={styles.button} onPress={handlePrint}>
            <Icon name="printer" size={20} color={text.secondary.color} />
            <Text style={[styles.buttonText, text.secondary]}>Print</Text>
          </RectButton>
          {currentMember.can(DELETE_SONGS) && (
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
    </>
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
