import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheetModal from './BottomSheetModal';

export default function SetlistOptionsBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheetModal onDismiss={onDismiss} ref={sheetRef}>
      <Text>Hi</Text>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({});
