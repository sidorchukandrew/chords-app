import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {getTimeFromDate} from '../../utils/date';
import CalendarEventBottomSheet from './CalendarEventBottomSheet';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import {reportError} from '../../utils/error';
import {deleteEventById} from '../../services/eventsService';

export default function CalendarEvent({event, onPress, onDeleted}) {
  const [isDetailsSheetVisible, setIsDetailsSheetVisible] = useState(false);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      setIsDetailsSheetVisible(false);
      await deleteEventById(event.id);
      onDeleted(event);
    } catch (error) {
      reportError(error);
      setIsDeleting(false);
    }
  }

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
        onDelete={() => setIsConfirmDeleteVisible(true)}
      />
      <ConfirmDeleteModal
        visible={isConfirmDeleteVisible}
        onDismiss={() => setIsConfirmDeleteVisible(false)}
        onDelete={handleDelete}
        deleting={isDeleting}
        message="Are you sure you'd like to delete this event from the calendar?"
      />
    </>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 2,
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
};
