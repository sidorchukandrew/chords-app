import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import Container from '../components/Container';
import ScreenModalHeader from '../components/ScreenModalHeader';
import ScreenModal from './ScreenModal';
import FormField from '../components/FormField';
import Button from '../components/Button';
import BinderColorSwatchesBottomSheet from '../components/BinderColorSwatchesBottomSheet';
import BinderColorSwatch from '../components/BinderColorSwatch';

export default function CreateBinderModal({navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [colorSwatchesVisible, setColorSwatchesVisible] = useState(false);

  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Create a Binder"
        onBackPress={navigation.goBack}
        onSavePress={navigation.goBack}
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
        <Button>
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
  );
}

const styles = StyleSheet.create({
  fieldsContainer: {
    marginVertical: 20,
    flexDirection: 'column',
  },
});
