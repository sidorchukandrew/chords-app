import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button';
import CalendarModal from '../components/CalendarModal';
import Container from '../components/Container';
import FormField from '../components/FormField';
import ScreenModalHeader from '../components/ScreenModalHeader';
import {format} from '../utils/date';
import ScreenModal from './ScreenModal';

export default function CreateSetlistModal({navigation}) {
  const [name, setName] = useState('');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [formattedScheduledDate, setFormattedScheduledDate] = useState('');
  const [scheduledDate, setScheduledDate] = useState();

  function handleSave() {}

  function handleDateChange(newDate) {
    setScheduledDate(newDate);
    let formatted = format(newDate, 'ddd MMMM D, YYYY');
    setFormattedScheduledDate(formatted);
  }

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
        <Button onPress={handleSave}>Save</Button>
      </Container>
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  fieldsContainer: {
    marginVertical: 20,
  },
});
