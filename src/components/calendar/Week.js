import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Day from './Day';
import {useTheme} from '../../hooks/useTheme';
import {getEventsForWeek} from '../../utils/calendar';

const EMPTY_EVENTS_FOR_WEEK = [[], [], [], [], [], [], []];
export default function Week({dates, events, onDeleted}) {
  const {border, isDark} = useTheme();
  const [eventsForWeek, setEventsForWeek] = useState(EMPTY_EVENTS_FOR_WEEK);

  useEffect(() => {
    setEventsForWeek(
      events ? getEventsForWeek(dates, events) : EMPTY_EVENTS_FOR_WEEK,
    );
  }, [events, dates]);

  return (
    <View
      style={[
        styles.weekContainer,
        isDark ? border.secondary : border.primary,
      ]}>
      <Day
        date={dates[0]}
        events={eventsForWeek[0]}
        surfaceColor={
          isDark ? {backgroundColor: '#020202'} : {backgroundColor: '#f9fafb'}
        }
        onDeleted={onDeleted}
      />
      <Day date={dates[1]} events={eventsForWeek[1]} onDeleted={onDeleted} />
      <Day date={dates[2]} events={eventsForWeek[2]} onDeleted={onDeleted} />
      <Day date={dates[3]} events={eventsForWeek[3]} onDeleted={onDeleted} />
      <Day date={dates[4]} events={eventsForWeek[4]} onDeleted={onDeleted} />
      <Day date={dates[5]} events={eventsForWeek[5]} onDeleted={onDeleted} />
      <Day
        border={false}
        date={dates[6]}
        events={eventsForWeek[6]}
        surfaceColor={
          isDark ? {backgroundColor: '#020202'} : {backgroundColor: '#f9fafb'}
        }
        onDeleted={onDeleted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  weekContainer: {flex: 1, flexDirection: 'row', borderBottomWidth: 1},
});
