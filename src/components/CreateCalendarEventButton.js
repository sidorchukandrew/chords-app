import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';
import {createEvent} from '../services/eventsService';
import {reportError} from '../utils/error';
import Snackbar from 'react-native-snackbar';

export default function CreateCalendarEventButton({event, onCreated}) {
  const [saving, setSaving] = useState(false);
  const {
    title,
    description,
    date,
    color,
    remindersEnabled,
    startTime,
    endTime,
    members,
    reminderDate,
  } = event;
  const {blue, text} = useTheme();
  async function handleConfirm() {
    try {
      setSaving(true);
      Snackbar.show({text: 'Saving...', duration: Snackbar.LENGTH_INDEFINITE});
      let {data} = await createEvent({
        title,
        description,
        date,
        color,
        remindersEnabled,
        startTime,
        endTime,
        members,
        reminderDate,
      });
      Snackbar.dismiss();
      setSaving(false);

      onCreated(data);
    } catch (error) {
      reportError(error);
    }
  }

  const isValid = !!title && !!date;
  return (
    <TouchableOpacity
      style={styles.headerButton}
      onPress={handleConfirm}
      disabled={!isValid || saving}>
      <Text
        style={[
          isValid && !saving ? blue.text : text.disabled,
          styles.headerButtonText,
        ]}>
        Create
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  headerButton: {
    padding: 3,
  },
});
