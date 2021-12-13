import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RectButton from './RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheetModal from './BottomSheetModal';

export default function BinderOptionsBottomSheet({
  visible,
  onDismiss,
  onNavigateTo,
}) {
  const sheetRef = useRef();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleNavigateTo(route) {
    sheetRef.current?.dismiss();
    onDismiss();
    onNavigateTo(route);
  }

  return (
    <BottomSheetModal
      onDismiss={onDismiss}
      ref={sheetRef}
      snapPoints={['10%']}
      detached>
      <View style={styles.container}>
        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Edit Binder Details')}>
          <Icon name="pencil" size={18} color="#2464eb" />
          <Text style={styles.buttonText}>Edit</Text>
        </RectButton>
        <RectButton styles={styles.button}>
          <Icon name="delete" size={18} color="#2464eb" />
          <Text style={styles.buttonText}>Delete</Text>
        </RectButton>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  button: {
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '600',
    marginLeft: 10,
  },
});
