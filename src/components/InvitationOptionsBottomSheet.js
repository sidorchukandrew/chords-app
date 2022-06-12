import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BottomSheet from './BottomSheet';
import {useNetInfo} from '@react-native-community/netinfo';
import RectButton from './RectButton';
import {reportError} from '../utils/error';
import InvitationsApi from '../api/invitationsApi';
import Snackbar from 'react-native-snackbar';
import {useTheme} from '../hooks/useTheme';

export default function InvitationOptionsBottomSheet({
  invitation,
  visible,
  onDismiss,
  onDeleted,
  onResent,
}) {
  const sheetRef = useRef();
  const {isConnected} = useNetInfo();
  const {surface, text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  async function handleDelete() {
    try {
      await InvitationsApi.deleteOne(invitation.id);
      onDismiss();
      sheetRef.current?.dismiss();
      onDeleted(invitation);
    } catch (error) {
      reportError(error, {showError: true});
    }
  }

  async function handleResend() {
    try {
      let {data} = await InvitationsApi.resendOne(invitation.id);
      onDismiss();
      sheetRef.current?.dismiss();
      onResent(data);
      Snackbar.show({
        text: 'Invitation was sent!',
      });
    } catch (error) {
      reportError(error, {showError: true});
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      onDismiss={onDismiss}
      dynamicHeight
      snapPoints={['CONTENT_HEIGHT']}>
      <View style={styles.container}>
        <Text style={[styles.titleText, text.primary]}>{invitation.email}</Text>
        <RectButton disabled={!isConnected} onPress={handleResend}>
          <Text
            style={[
              styles.buttonText,
              text.secondary,
              !isConnected && text.disabled,
            ]}>
            Resend invitation
          </Text>
        </RectButton>
        <RectButton disabled={!isConnected} onPress={handleDelete}>
          <Text
            style={[
              styles.buttonText,
              styles.deleteColor,
              !isConnected && text.disabled,
            ]}>
            Delete
          </Text>
        </RectButton>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 18,
    paddingBottom: 15,
    textAlign: 'center',
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
