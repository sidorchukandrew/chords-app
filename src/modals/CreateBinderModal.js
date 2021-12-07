import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import Container from '../components/Container';
import ScreenModalHeader from '../components/ScreenModalHeader';
import ScreenModal from './ScreenModal';
import FormField from '../components/FormField';
import Button from '../components/Button';
import BottomSheet from '../components/BottomSheet';

export default function CreateBinderModal({navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const colorModalRef = useRef();

  function handleOpenColorModal() {
    colorModalRef.current?.present;
  }

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

          <BottomSheet
            ref={colorModalRef}
            button={
              <FormField
                label="Color"
                value={color}
                onPress={handleOpenColorModal}
              />
            }
          />
        </View>
        {/* <Button>
          <Text>Save</Text>
        </Button> */}
      </Container>
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  fieldsContainer: {
    marginVertical: 20,
    flexDirection: 'column',
    height: '100%',
  },
});
