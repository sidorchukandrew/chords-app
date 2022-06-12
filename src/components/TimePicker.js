import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WheelPicker from 'react-native-wheely';
import {useTheme} from '../hooks/useTheme';

export default function TimePicker({onTimeChange, selectedTime}) {
  const {text, surface} = useTheme();

  function handleHourChange(newHourIndex) {
    onTimeChange?.({...selectedTime, hour: HOURS[newHourIndex]});
  }

  function handleMinutesChange(newMinutesIndex) {
    onTimeChange?.({...selectedTime, minutes: MINUTES[newMinutesIndex]});
  }

  function handlePeriodChange(newPeriodIndex) {
    onTimeChange?.({...selectedTime, period: PERIODS[newPeriodIndex]});
  }

  function hourIndex() {
    return HOURS.findIndex(hour => hour === selectedTime.hour);
  }

  function minutesIndex() {
    return MINUTES.findIndex(minute => minute === selectedTime.minutes);
  }

  function periodIndex() {
    return PERIODS.findIndex(period => period === selectedTime.period);
  }

  return (
    <View style={styles.container}>
      <WheelPicker
        options={HOURS}
        onChange={handleHourChange}
        containerStyle={styles.hoursContainer}
        itemHeight={60}
        itemTextStyle={[styles.text, text.primary]}
        selectedIndicatorStyle={surface.tertiary}
        selectedIndex={hourIndex()}
      />
      <WheelPicker
        options={MINUTES}
        onChange={handleMinutesChange}
        containerStyle={styles.minutesContainer}
        itemHeight={60}
        itemTextStyle={[styles.text, text.primary]}
        selectedIndicatorStyle={surface.tertiary}
        selectedIndex={minutesIndex()}
      />
      <WheelPicker
        options={PERIODS}
        onChange={handlePeriodChange}
        itemHeight={60}
        itemTextStyle={[styles.text, text.primary]}
        selectedIndicatorStyle={surface.tertiary}
        selectedIndex={periodIndex()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hoursContainer: {
    marginRight: 15,
  },
  minutesContainer: {
    marginRight: 15,
  },
  container: {flexDirection: 'row'},
});

const PERIODS = ['AM', 'PM'];
const HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const MINUTES = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
];
