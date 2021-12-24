import {StyleSheet, Text, View} from 'react-native';
import {createBinder, updateBinder} from '../services/bindersService';

import BinderColorSwatch from '../components/BinderColorSwatch';
import BinderColorSwatchesBottomSheet from '../components/BinderColorSwatchesBottomSheet';
import Button from '../components/Button';
import Container from '../components/Container';
import FormField from '../components/FormField';
import React from 'react';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import {isEmpty} from '../utils/object';
import {reportError} from '../utils/error';
import {useState} from 'react';

export default function EditBinderDetailsModal({navigation, route}) {
  const [binder, setBinder] = useState(route.params);
  const [name, setName] = useState(route.params?.name || '');
  const [description, setDescription] = useState(
    route.params?.description || '',
  );
  const [color, setColor] = useState(route.params?.color || '');
  const [colorSwatchesVisible, setColorSwatchesVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    try {
      let updates = buildUpdates();

      if (!isEmpty(updates)) {
        setSaving(true);
        await updateBinder(binder.id, updates);
        setBinder(currentBinder => ({...currentBinder, ...updates}));
      }
    } catch (error) {
      reportError(error);
    } finally {
      setSaving(false);
    }
  }

  function buildUpdates() {
    let updates = {};

    if (name !== binder.name) updates.name = name;
    if (color !== binder.color) updates.color = color;
    if (description !== binder.description) updates.description = description;

    return updates;
  }

  function handleGoBack() {
    navigation.navigate('Binder Detail', binder);
  }

  return (
    <>
      <ScreenModal>
        <ScreenModalHeader
          options={{saveVisible: true, backVisible: true}}
          title="Edit"
          onBackPress={handleGoBack}
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
