import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import FormField from '../components/FormField';
import MeterModal from '../components/MeterModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import SongKeyModal from '../components/SongKeyModal';
import ScreenModal from './ScreenModal';
import {reportError} from '../utils/error';
import {createSong} from '../services/songsService';

export default function CreateSongModal({navigation}) {
  const [name, setName] = useState('');
  const [bpm, setBpm] = useState('');
  const [artist, setArtist] = useState('');
  const [originalKey, setOriginalKey] = useState('');
  const [originalKeyModalVisible, setOriginalKeyModalVisible] = useState(false);
  const [meter, setMeter] = useState('');
  const [meterModalVisible, setMeterModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    try {
      setSaving(true);
      let song = {
        name,
        bpm,
        artist,
        original_key: originalKey,
        meter,
      };

      let {data} = await createSong(song);
      navigation.navigate('Songs', {created: data});
    } catch (error) {
      reportError(error);
      setSaving(false);
    }
  }

  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Add a Song"
        onBackPress={navigation.goBack}
        onSavePress={handleSave}
        saveDisabled={saving || !name}
      />
      <Container>
        <View style={styles.fieldsContainer}>
          <FormField value={name} onChange={setName} label="Name *" />
          <FormField value={artist} onChange={setArtist} label="Artist" />
          <FormField
            value={bpm}
            onChange={setBpm}
            label="Tempo"
            keyboardType="numeric"
          />
          <FormField
            value={originalKey}
            onPress={() => setOriginalKeyModalVisible(true)}
            label="Key"
          />
          <SongKeyModal
            visible={originalKeyModalVisible}
            onClose={() => setOriginalKeyModalVisible(false)}
            onChange={setOriginalKey}
            songKey={originalKey}
          />

          <FormField
            value={meter}
            onPress={() => setMeterModalVisible(true)}
            label="Meter"
          />

          <MeterModal
            visible={meterModalVisible}
            onClose={() => setMeterModalVisible(false)}
            onChange={setMeter}
            meter={meter}
          />
        </View>
        <Button onPress={handleSave} loading={saving} disabled={!name}>
          Save
        </Button>

        {/* <AccentButton>Import</AccentButton> */}
      </Container>
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  fieldsContainer: {
    marginVertical: 20,
  },
});
