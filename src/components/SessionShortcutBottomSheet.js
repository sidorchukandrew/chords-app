import {StyleSheet, Text, View} from 'react-native';
import BottomSheet from './BottomSheet';
import React, {useEffect, useRef} from 'react';
import useSessionConnection from '../hooks/useSessionConnection';
import RectButton from './RectButton';
import {useTheme} from '../hooks/useTheme';
import {useNetInfo} from '@react-native-community/netinfo';

export default function SessionShortcutBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();
  const {activeSession, hostedSession, endSession, leaveSessionAsMember} =
    useSessionConnection();
  const {red, text} = useTheme();
  const {isConnected} = useNetInfo();

  useEffect(() => {
    if (visible) {
      sheetRef.current?.present();
    }
  }, [sheetRef, visible]);

  return (
    <BottomSheet
      ref={sheetRef}
      dynamicHeight
      snapPoints={['CONTENT_HEIGHT']}
      onDismiss={onDismiss}>
      <View style={styles.sheet}>
        {activeSession && (
          <RectButton
            onPress={() => leaveSessionAsMember(activeSession)}
            disabled={!isConnected}>
            <Text
              style={[
                isConnected ? red.text : text.disabled,
                styles.buttonText,
              ]}>
              Leave session
            </Text>
          </RectButton>
        )}
        {hostedSession && (
          <RectButton
            onPress={() => endSession(hostedSession)}
            disabled={!isConnected}>
            <Text
              style={[
                isConnected ? red.text : text.disabled,
                styles.buttonText,
              ]}>
              End session
            </Text>
          </RectButton>
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    padding: 10,
  },
  buttonText: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
});
