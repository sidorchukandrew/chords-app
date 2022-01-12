import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createSong, updateSong} from '../services/songsService';

import Button from '../components/Button';
import Container from '../components/Container';
import FormField from '../components/FormField';
import MeterModal from '../components/MeterModal';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import SongKeyModal from '../components/SongKeyModal';
import {isEmpty} from '../utils/object';
import {reportError} from '../utils/error';

export default function EditSongDetailsModal({navigation, route}) {
  const [name, setName] = useState(route.params?.name || '');
  const [bpm, setBpm] = useState(route.params?.bpm || '');
  const [artist, setArtist] = useState(route.params?.artist || '');
  const [originalKey, setOriginalKey] = useState(
    route.params?.original_key || '',
  );
  const [originalKeyModalVisible, setOriginalKeyModalVisible] = useState(false);
  const [meter, setMeter] = useState(route.params?.meter || '');
  const [meterModalVisible, setMeterModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [song, setSong] = useState(route.params);

  async function handleSave() {
    try {
      let updates = buildUpdates();
      if (!isEmpty(updates)) {
        setSaving(true);
        await updateSong(song.id, updates);
        setSong(currentSong => ({...currentSong, ...updates}));
      }
    } catch (error) {
      reportError(error);
    } finally {
      setSaving(false);
    }
  }

  function buildUpdates() {
    let updates = {};

    if (song.name !== name) updates.name = name;
    if (song.artist !== artist) updates.artist = artist;
    if (song.bpm !== bpm) updates.bpm = bpm;
    if (song.original_key !== originalKey) updates.original_key = originalKey;
    if (song.meter !== meter) updates.meter = meter;

    return updates;
  }

  function handleGoBack() {
    navigation.navigate('Song Detail', song);
  }

  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Edit"
        onBackPress={handleGoBack}
        onSavePress={handleSave}
        saveDisabled={saving || !name}
      />
      <Container>
        <View style={styles.fieldsContainer}>
          <FormField value={name} onChange={setName} label="Name *" />
          <FormField value={artist} onChange={setArtist} label="Artist" />
          <FormField
            value={`${bpm}`}
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
      </Container>
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  fieldsContainer: {
    marginVertical: 20,
  },
});
