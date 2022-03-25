import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks/useTheme';

export default function Day({border = true, date, surfaceColor}) {
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
  },
});
