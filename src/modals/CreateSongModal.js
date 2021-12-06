import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Container from '../components/Container';
import Input from '../components/Input';
import ScreenModalHeader from '../components/ScreenModalHeader';
import ScreenModal from './ScreenModal';

export default function CreateSongModal({navigation}) {
  const [name, setName] = useState('');
  const [bpm, setBpm] = useState('');

  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Add a Song"
        onBackPress={navigation.goBack}
        onSavePress={navigation.goBack}
      />
      <Container>
        <View style={styles.fieldsContainer}>
          <Input
            value={name}
            onChange={setName}
            placeholder="Name"
            style={styles.field}
          />
        </View>
      </Container>
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 10,
  },
  fieldsContainer: {
    marginVertical: 20,
  },
});
