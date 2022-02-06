import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BottomSheet from './BottomSheet';
import {DELETE_SONGS} from '../utils/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RectButton from './RectButton';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';

export default function SongOptionsBottomSheet({
  visible,
  onDismiss,
  onDelete,
  onPrint,
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
            <Icon name="printer" size={20} color="#505050" />
            <Text style={styles.buttonText}>Print</Text>
          </RectButton>
          {currentMember.can(DELETE_SONGS) && (
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
    </>
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
