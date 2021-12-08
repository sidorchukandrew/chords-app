import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useEffect, useState} from 'react/cjs/react.development';
import {format} from '../utils/date';
import Modal from './Modal';

export default function CalendarModal({
  visible,
  onClose,
  scheduledDate,
  onChange,
}) {
  const [calendarFormattedDate, setCalendarFormattedDate] = useState(
    format(scheduledDate, 'YYYY-MM-DD'),
  );

  useEffect(() => {
    if (scheduledDate)
      setCalendarFormattedDate(format(scheduledDate, 'YYYY-MM-DD'));
  }, [scheduledDate]);

  function handleDayPress({dateString}) {
    onChange?.(dayjs(dateString, 'YYYY-MM-DD').toDate());
    onClose();
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <Calendar
        enableSwipeMonths={true}
        theme={{arrowColor: '#2464eb', todayTextColor: '#2464eb'}}
        onDayPress={handleDayPress}
        markedDates={{
          [calendarFormattedDate]: {selected: true, selectedColor: '#2464eb'},
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({});
