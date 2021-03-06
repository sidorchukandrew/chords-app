import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BottomSheet from './BottomSheet';
import Button from './Button';
import Container from './Container';
import FormField from './FormField';
import {createTheme} from '../services/themesService';
import {reportError} from '../utils/error';
import {useTheme} from '../hooks/useTheme';

export default function CreateThemeBottomSheet({
  visible,
  onDismiss,
  onCreated,
}) {
  const sheetRef = useRef();
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const {text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  async function handleCreate() {
    try {
      setCreating(true);
      let {data} = await createTheme(name);
      onCreated(data);
      handleDismiss();
    } catch (error) {
      reportError(error);
      setCreating(false);
    }
  }

  function handleDismiss() {
    setCreating(false);
    setName('');
    sheetRef.current?.dismiss();
    onDismiss();
  }

  return (
    <BottomSheet
      onDismiss={handleDismiss}
      ref={sheetRef}
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight>
      <Container>
        <Text style={[styles.title, text.primary]}>New theme</Text>
        <FormField label="Theme" value={name} onChange={setName} />
        <Button
          disabled={!name}
          style={styles.button}
          onPress={handleCreate}
          loading={creating}>
          <Text>Create</Text>
        </Button>
      </Container>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10,
  },
  button: {
    marginTop: 15,
  },
});
