import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useLayoutEffect, useState} from 'react';

import {useTheme} from '../hooks/useTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AddEventContext} from '../components/calendar/AddCalendarEventBottomSheet';
import TimePicker from '../components/TimePicker';
import {breakApartTime} from '../utils/date';

export default function EndTimeBottomSheetScreen({navigation}) {
  const {blue} = useTheme();
  const {setEndTime, endTime} = useContext(AddEventContext);
  const [endTimeCopy, setEndTimeCopy] = useState(() => {
    let sixPM = {
      hour: '6',
      minutes: '00',
      period: 'PM',
    };

    return endTime ? breakApartTime(endTime) : sixPM;
  });

  const handleConfirmTime = useCallback(() => {
    setEndTime(
      `${endTimeCopy.hour}:${endTimeCopy.minutes} ${endTimeCopy.period}`,
    );
    navigation.goBack();
  }, [endTimeCopy, setEndTime, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmTime}>
          <Text style={[blue.text, styles.confirmText]}>Confirm</Text>
        </TouchableOpacity>
      ),
    });
  }, [blue, navigation, handleConfirmTime]);

  return (
    <View style={styles.screen}>
      <TimePicker onTimeChange={setEndTimeCopy} selectedTime={endTimeCopy} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    marginBottom: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
  confirmText: {
    fontWeight: '500',
    fontSize: 16,
  },
  confirmButton: {
    padding: 3,
  },
});
