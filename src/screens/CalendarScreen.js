import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Calendar from '../components/calendar/Calendar';
import {useTheme} from '../hooks/useTheme';
import CircleButton from '../components/CircleButton';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ADD_EVENTS} from '../utils/auth';
import {useNetInfo} from '@react-native-community/netinfo';
import {reportError} from '../utils/error';
import {useFocusEffect} from '@react-navigation/native';
import {getAllEvents} from '../services/eventsService';
import AddCalendarEventBottomSheet from '../components/calendar/AddCalendarEventBottomSheet';

export default function CalendarScreen() {
  const {surface} = useTheme();
  const currentMember = useSelector(selectCurrentMember);
  const {isConnected} = useNetInfo();
  const [events, setEvents] = useState([]);
  const [isAddEventVisible, setIsAddEventVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          let {data} = await getAllEvents();
          setEvents(data);
        } catch (error) {
          reportError(error);
        }
      }
      fetchData();
    }, []),
  );

  function handleEventDeleted(deletedEvent) {
    setEvents(previousEvents =>
      previousEvents.filter(event => event.id !== deletedEvent.id),
    );
  }

  function handleEventCreated(event) {
    setEvents(currentEvents => currentEvents.concat(event));
  }

  return (
    <View style={[styles.screen, surface.primary]}>
      <Calendar events={events} onDeleted={handleEventDeleted} />
      {currentMember.can(ADD_EVENTS) && (
        <CircleButton
          style={styles.addButton}
          disabled={!isConnected}
          onPress={() => setIsAddEventVisible(true)}>
          <Icon name="plus" size={35} color="white" />
        </CircleButton>
      )}
      <AddCalendarEventBottomSheet
        visible={isAddEventVisible}
        onDismiss={() => setIsAddEventVisible(false)}
        onCreated={handleEventCreated}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
