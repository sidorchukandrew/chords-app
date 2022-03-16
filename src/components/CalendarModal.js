import React, {useRef, useEffect, useState} from 'react';

import BottomSheetModal from './BottomSheetModal';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import {format} from '../utils/date';
import {useTheme} from '../hooks/useTheme';

export default function CalendarModal({
  visible,
  onClose,
  scheduledDate,
  onChange,
}) {
  const sheetRef = useRef();
  const {blue, surface, isDark, text} = useTheme();

  const [calendarFormattedDate, setCalendarFormattedDate] = useState(
    format(scheduledDate, 'YYYY-MM-DD'),
  );

  useEffect(() => {
    if (scheduledDate)
      setCalendarFormattedDate(format(scheduledDate, 'YYYY-MM-DD'));
  }, [scheduledDate]);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleDayPress({dateString}) {
    onChange?.(dayjs(dateString, 'YYYY-MM-DD').toDate());
    sheetRef.current?.dismiss();
    onClose();
  }

  return (
    <BottomSheetModal visible={visible} onDismiss={onClose} ref={sheetRef}>
      <Calendar
        enableSwipeMonths={true}
        theme={{
          arrowColor: blue.text.color,
          todayTextColor: blue.text.color,
          monthTextColor: text.primary.color,
          calendarBackground: isDark
            ? surface.secondary.backgroundColor
            : surface.primary.backgroundColor,
        }}
        onDayPress={handleDayPress}
        markedDates={{
          [calendarFormattedDate]: {selected: true, selectedColor: '#2464eb'},
        }}
      />
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({});
