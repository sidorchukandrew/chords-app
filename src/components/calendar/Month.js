import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Week from './Week';
import {getCalendarDates, MONTH_NUMBERS} from '../../utils/calendar';

function Month({height, month, events}) {
  console.log(month, ' rerendered');
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
      ]}>
      <Week dates={weeks[0]} events={events} />
      <Week dates={weeks[1]} events={events} />
      <Week dates={weeks[2]} events={events} />
      <Week dates={weeks[3]} events={events} />
      <Week dates={weeks[4]} events={events} />
    </View>
  );
}

const styles = StyleSheet.create({
  weeksContainer: {
    width: '100%',
  },
});

export default React.memo(Month, areEqual);

function areEqual(prevProps, nextProps) {
  return prevProps.height === nextProps.height;
}
