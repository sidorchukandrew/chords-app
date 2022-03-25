import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Week from './Week';
import {getCalendarDates, MONTH_NUMBERS} from '../../utils/calendar';
import {useTheme} from '../../hooks/useTheme';

export default function Month({height, month}) {
  const {border, isDark} = useTheme();

  const [weeks] = useState(() => {
    const monthName = month?.split(' ')?.[0];
    const year = month?.split(' ')?.[1];
    return getCalendarDates(MONTH_NUMBERS[monthName], year);
  });

  return (
    <View
      style={[
        styles.weeksContainer,
        {
          height,
        },
        isDark ? border.secondary : border.primary,
      ]}>
      <Week dates={weeks[0]} />
      <Week dates={weeks[1]} />
      <Week dates={weeks[2]} />
      <Week dates={weeks[3]} />
      <Week dates={weeks[4]} />
    </View>
  );
}

const styles = StyleSheet.create({
  weeksContainer: {
    width: '100%',
    borderTopWidth: 1,
  },
});
