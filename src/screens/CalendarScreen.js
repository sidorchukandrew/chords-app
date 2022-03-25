import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Calendar from '../components/calendar/Calendar';
import {useTheme} from '../hooks/useTheme';

export default function CalendarScreen() {
  const {surface} = useTheme();

  return (
    <View style={[styles.screen, surface.primary]}>
      <Calendar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
