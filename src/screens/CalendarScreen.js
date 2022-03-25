import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Calendar from '../components/calendar/Calendar';
import {useTheme} from '../hooks/useTheme';
import CircleButton from '../components/CircleButton';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ADD_EVENTS} from '../utils/auth';
import {useNetInfo} from '@react-native-community/netinfo';
import {getAllEvents} from '../services/eventsService';
import {reportError} from '../utils/error';
import {CalendarList} from 'react-native-calendars';

export default function CalendarScreen() {
  const {surface} = useTheme();
  const currentMember = useSelector(selectCurrentMember);
  const {isConnected} = useNetInfo();
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       let {data} = await getAllEvents();
  //       setEvents(data);
  //     } catch (error) {
  //       reportError(error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <View style={[styles.screen, surface.primary]}>
      {/* <CalendarList /> */}
      <Calendar events={events} />
      {currentMember.can(ADD_EVENTS) && (
        <CircleButton style={styles.addButton} disabled={!isConnected}>
          <Icon name="plus" size={35} color="white" />
        </CircleButton>
      )}
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
