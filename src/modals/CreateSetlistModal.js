import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../components/Button';
import CalendarModal from '../components/CalendarModal';
import Container from '../components/Container';
import FormField from '../components/FormField';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import {createSetlist} from '../services/setlistsService';
import {format} from '../utils/date';
import {reportError} from '../utils/error';

export default function CreateSetlistModal({navigation}) {
  const [name, setName] = useState('');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [formattedScheduledDate, setFormattedScheduledDate] = useState('');
  const [scheduledDate, setScheduledDate] = useState();
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    try {
      setSaving(true);
      let {data} = await createSetlist({name, scheduledDate});
      navigation.navigate('Sets', {created: {...data, songs: []}});
    } catch (error) {
      setSaving(false);
      reportError(error);
    }
  }

  function handleDateChange(newDate) {
    setScheduledDate(newDate);
    let formatted = format(newDate, 'ddd MMMM D, YYYY');
    setFormattedScheduledDate(formatted);
  }

  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Create a set"
        onBackPress={navigation.goBack}
        onSavePress={handleSave}
        saveDisabled={!name || !scheduledDate || saving}
      />
      <Container>
        <View style={styles.fieldsContainer}>
          <FormField label="Name" value={name} onChange={setName} />
          <FormField
            label="Date"
            value={formattedScheduledDate}
            onPress={() => setDateModalVisible(true)}
          />
          <CalendarModal
            visible={dateModalVisible}
            scheduledDate={scheduledDate}
            onChange={handleDateChange}
            onClose={() => setDateModalVisible(false)}
          />
        </View>
        <Button
          onPress={handleSave}
          disabled={!name || !scheduledDate}
          loading={saving}>
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
