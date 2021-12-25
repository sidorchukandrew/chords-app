import {StyleSheet, Text, View} from 'react-native';

import Button from '../components/Button';
import CalendarModal from '../components/CalendarModal';
import Container from '../components/Container';
import FormField from '../components/FormField';
import React from 'react';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import {format} from '../utils/date';
import {isEmpty} from '../utils/object';
import {reportError} from '../utils/error';
import {updateSetlist} from '../services/setlistsService';
import {useState} from 'react';

export default function EditSetlistDetailsModal({navigation, route}) {
  const [name, setName] = useState(route.params?.name || '');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [setlist, setSetlist] = useState(route.params);
  const [formattedScheduledDate, setFormattedScheduledDate] = useState(() => {
    return route.params.scheduled_date
      ? format(route.params.scheduled_date, 'ddd MMMM D, YYYY')
      : '';
  });
  const [scheduledDate, setScheduledDate] = useState(() => {
    return route.params.scheduled_date
      ? format(route.params.scheduled_date, 'YYYY-MM-DD')
      : '';
  });
  const [saving, setSaving] = useState(false);

  function handleDateChange(newDate) {
    setScheduledDate(newDate);
    let formatted = format(newDate, 'ddd MMMM D, YYYY');
    setFormattedScheduledDate(formatted);
  }

  async function handleSave() {
    try {
      let updates = buildUpdates();
      if (!isEmpty(updates)) {
        setSaving(true);
        await updateSetlist(setlist.id, updates);
        setSetlist(currentSetlist => ({...currentSetlist, ...updates}));
      }
    } catch (error) {
      reportError(error);
    } finally {
      setSaving(false);
    }
  }

  function buildUpdates() {
    let updates = {};

    if (setlist.name !== name) updates.name = name;
    if (setlist.scheduled_date !== scheduledDate)
      updates.scheduled_date = scheduledDate;

    return updates;
  }

  function handleGoBack() {
    navigation.navigate('Setlist Detail', setlist);
  }

  return (
    <ScreenModal>
      <ScreenModalHeader
        options={{saveVisible: true, backVisible: true}}
        title="Edit"
        onBackPress={handleGoBack}
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
    flexDirection: 'column',
  },
});
