import {StyleSheet, Text, View} from 'react-native';

import BinderColorSwatch from '../components/BinderColorSwatch';
import BinderColorSwatchesBottomSheet from '../components/BinderColorSwatchesBottomSheet';
import Button from '../components/Button';
import Container from '../components/Container';
import FormField from '../components/FormField';
import React from 'react';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import {createBinder} from '../services/bindersService';
import {reportError} from '../utils/error';
import {useState} from 'react';

export default function CreateBinderModal({navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [colorSwatchesVisible, setColorSwatchesVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    try {
      let binder = {
        name,
        description,
        color,
      };
      await createBinder(binder);
      navigation.goBack();
    } catch (error) {
      reportError(error);
      setSaving(false);
    }
  }

  return (
    <>
      <ScreenModal>
        <ScreenModalHeader
          options={{saveVisible: true, backVisible: true}}
          title="Create a Binder"
          onBackPress={navigation.goBack}
          onSavePress={handleSave}
          saveDisabled={!name || saving}
        />
        <Container>
          <View style={styles.fieldsContainer}>
            <FormField label="Name" value={name} onChange={setName} />

            <FormField
              label="Description"
              value={description}
              onChange={setDescription}
            />
            <FormField
              label="Color"
              value={color}
              onPress={() => setColorSwatchesVisible(true)}
              renderRightAccessory={() =>
                color ? <BinderColorSwatch color={color} /> : null
              }
            />
          </View>
          <Button loading={saving} disabled={!name} onPress={handleSave}>
            <Text>Save</Text>
          </Button>
        </Container>
        <BinderColorSwatchesBottomSheet
          visible={colorSwatchesVisible}
          onDismiss={() => setColorSwatchesVisible(false)}
          onChange={setColor}
          color={color}
        />
      </ScreenModal>
    </>
  );
}

const styles = StyleSheet.create({
  fieldsContainer: {
    marginVertical: 20,
    flexDirection: 'column',
  },
});
