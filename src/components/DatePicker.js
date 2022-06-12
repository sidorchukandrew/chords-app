import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {useTheme} from '../hooks/useTheme';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export default function DatePicker({onChange, selectedDate, visible}) {
  const {blue, text, surface, isDark} = useTheme();

  return (
    visible && (
      <Animated.View entering={FadeIn} exiting={FadeOut}>
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
          onDayPress={({dateString}) => onChange?.(dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#2464eb',
            },
          }}
        />
      </Animated.View>
    )
  );
}

const styles = StyleSheet.create({});
