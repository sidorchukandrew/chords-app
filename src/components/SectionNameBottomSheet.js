import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet from './BottomSheet';
import FormField from './FormField';
import ConfirmCancelButtons from './ConfirmCancelButtons';

export default function SectionNameBottomSheet({
  visible,
  onDismiss,
  currentName,
  onConfirmName,
}) {
  const sheetRef = useRef();
  const [localName, setLocalName] = useState(currentName || '');

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  useEffect(() => {
    setLocalName(currentName || '');
  }, [currentName]);

  function handleDismiss() {
    sheetRef.current?.dismiss();
    onDismiss();
    setLocalName('');
  }

  function handleConfirm() {
    onConfirmName(localName);

    if (currentName) {
      handleDismiss();
    } else {
      setLocalName('');
    }
  }

  return (
    <BottomSheet
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight
      ref={sheetRef}
      onDismiss={onDismiss}>
      <View style={styles.container}>
        <FormField label="Name" value={localName} onChange={setLocalName} />
        <ConfirmCancelButtons
          onCancel={handleDismiss}
          onConfirm={handleConfirm}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
