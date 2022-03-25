import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {getTimeFromDate} from '../../utils/date';
import CalendarEventBottomSheet from './CalendarEventBottomSheet';

export default function CalendarEvent({event, onPress}) {
  const [isDetailsSheetVisible, setIsDetailsSheetVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[styles.eventContainer, EVENT_COLORS[event.color]]}
        onPress={() => setIsDetailsSheetVisible(true)}>
        <Text
          style={styles.eventTitleText}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {getTimeFromDate(event.start_time)} {event.title}
        </Text>
      </TouchableOpacity>
      <CalendarEventBottomSheet
        event={event}
        onDismiss={() => setIsDetailsSheetVisible(false)}
        visible={isDetailsSheetVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 8,
  },
  eventTitleText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});

export const EVENT_COLORS = {
  red: {
    backgroundColor: '#ef4444',
  },
  blue: {
    backgroundColor: '#2563eb',
  },
  green: {
    backgroundColor: '#22c55e',
  },
  yellow: {
    backgroundColor: '#facc15',
  },
  indigo: {
    backgroundColor: '#4f46e5',
  },
  purple: {
    backgroundColor: '#9333ea',
  },
  pink: {
    backgroundColor: '#ec4899',
  },
  gray: {
    backgroundColor: '#4b5563',
  },
  black: {
    backgroundColor: 'black',
  },
  white: {
    backgroundColor: 'white',
  },
};
