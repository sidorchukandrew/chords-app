import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import FormField from '../components/FormField';
import DatePicker from '../components/DatePicker';
import {format} from '../utils/date';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../hooks/useTheme';
import {
  AddEventContext,
  BottomSheetContext,
} from '../components/calendar/AddCalendarEventBottomSheet';
import EventColorPicker from '../components/calendar/EventColorPicker';
import EventRemindersConfigurer from '../components/EventRemindersConfigurer';
import CreateCalendarEventButton from '../components/CreateCalendarEventButton';

export default function AddCalendarEventBottomSheetScreen({navigation}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('blue');
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    members,
    reminderDate,
    onCreated,
  } = useContext(AddEventContext);
  const {onDismiss} = useContext(BottomSheetContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {text, blue, lightBlue, icon, border} = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CreateCalendarEventButton
          event={{
            date,
            color,
            remindersEnabled,
            title,
            description,
            startTime,
            endTime,
            members,
            reminderDate,
          }}
          onCreated={onCreated}
        />
      ),
      headerLeft: () => {
        return (
          <TouchableOpacity style={styles.headerButton} onPress={onDismiss}>
            <Text style={[blue.text, styles.headerButtonText]}>Cancel</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [
    navigation,
    blue,
    title,
    description,
    date,
    color,
    remindersEnabled,
    startTime,
    endTime,
    members,
    reminderDate,
    text,
    onCreated,
    onDismiss,
  ]);

  function toggleShowDatePicker() {
    setShowDatePicker(currentValue => !currentValue);
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <FormField value={title} onChange={setTitle} label="Title" />
      <FormField
        value={description}
        onChange={setDescription}
        label="Description (optional)"
      />

      <FormField
        value={format(date, 'MMM DD, YYYY')}
        label="Date"
        onPress={toggleShowDatePicker}
        renderRightAccessory={() => (
          <TouchableOpacity
            onPress={toggleShowDatePicker}
            style={[
              styles.calendarIconButton,
              showDatePicker && lightBlue.background,
            ]}>
            <Icon
              name="calendar"
              size={18}
              color={showDatePicker ? blue.text.color : text.secondary.color}
            />
          </TouchableOpacity>
        )}
      />
      <DatePicker
        onChange={setDate}
        selectedDate={date}
        visible={showDatePicker}
      />

      <FormField
        label="Start time"
        onPress={() => navigation.navigate('Start Time')}
        value={startTime}
        renderRightAccessory={() =>
          startTime && (
            <TouchableOpacity
              onPress={() => setStartTime(null)}
              style={[styles.clearButton]}>
              <Icon name="close" size={18} color={text.secondary.color} />
            </TouchableOpacity>
          )
        }
      />
      <FormField
        label="End time"
        onPress={() => navigation.navigate('End Time')}
        value={endTime}
        renderRightAccessory={() =>
          endTime && (
            <TouchableOpacity
              onPress={() => setEndTime(null)}
              style={[styles.clearButton]}>
              <Icon name="close" size={18} color={text.secondary.color} />
            </TouchableOpacity>
          )
        }
      />

      <View style={[styles.section, border.primary]}>
        <Text style={[styles.label, {color: icon.secondary}]}>Color</Text>
        <EventColorPicker selectedColor={color} onChange={setColor} />
      </View>

      <EventRemindersConfigurer
        remindersEnabled={remindersEnabled}
        onEnabledChange={setRemindersEnabled}
        navigation={navigation}
        members={members}
        reminderDate={reminderDate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    paddingBottom: 50,
  },
  calendarIconButton: {
    padding: 4,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
  },
  section: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  headerButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  headerButton: {
    padding: 3,
  },
  clearButton: {
    padding: 4,
  },
});
