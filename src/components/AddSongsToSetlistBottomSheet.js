import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet from './BottomSheet';
import SearchInput from './SearchInput';

export default function AddSongsToSetlistBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheet ref={sheetRef} onDismiss={onDismiss} snapPoints={['90%']}>
      <View style={styles.container}>
        <Text style={styles.title}>Songs in your library</Text>
        <View style={styles.searchContainer}>
          <SearchInput />
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  searchContainer: {
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    marginBottom: 15,
  },
});
