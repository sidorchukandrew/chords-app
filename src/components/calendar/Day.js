import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks/useTheme';
import CalendarEvent from './CalendarEvent';

export default function Day({
  border = true,
  date,
  surfaceColor,
  events,
  onDeleted,
}) {
  const {border: borderColor, text, blue, isDark} = useTheme();
  return (
    <View
      style={[
        styles.dayContainer,
        border && styles.border,
        isDark ? borderColor.secondary : borderColor.primary,
        surfaceColor,
      ]}>
      <View style={styles.dateContainer}>
        <View style={[styles.rounded, date?.isToday && blue.background]}>
          <Text
            style={[
              styles.dateText,
              text.secondary,
              date?.isToday && styles.todayText,
            ]}>
            {date?.dateNumber}
          </Text>
        </View>
      </View>

      <View>
        {events?.map(event => (
          <CalendarEvent event={event} key={event.id} onDeleted={onDeleted} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    padding: 10,
  },
  dateContainer: {
    alignItems: 'flex-end',
    height: 35,
  },
  dateText: {
    textAlign: 'right',
    fontWeight: '600',
  },
  border: {
    borderRightWidth: 1,
  },
  todayText: {
    padding: 5,
    color: 'white',
  },
  rounded: {
    borderRadius: 50,
    width: 27,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
