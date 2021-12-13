import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet from './BottomSheet';

export default function SongOptionsBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();
  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheet
      snapPoints={['40%', '60%']}
      onDismiss={onDismiss}
      ref={sheetRef}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Text>Hello</Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});
