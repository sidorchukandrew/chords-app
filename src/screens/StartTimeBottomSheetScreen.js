import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useLayoutEffect, useState} from 'react';

import {useTheme} from '../hooks/useTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AddEventContext} from '../components/calendar/AddCalendarEventBottomSheet';
import TimePicker from '../components/TimePicker';
import {breakApartTime} from '../utils/date';

export default function StartTimeBottomSheetScreen({navigation}) {
  const {blue} = useTheme();
  const {setStartTime, startTime} = useContext(AddEventContext);
  const [startTimeCopy, setStartTimeCopy] = useState(() => {
    let sixPM = {
      hour: '6',
      minutes: '00',
      period: 'PM',
    };

    return startTime ? breakApartTime(startTime) : sixPM;
  });

  const handleConfirmTime = useCallback(() => {
    setStartTime(
      `${startTimeCopy.hour}:${startTimeCopy.minutes} ${startTimeCopy.period}`,
    );
    navigation.goBack();
  }, [startTimeCopy, setStartTime, navigation]);

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
      <TimePicker
        onTimeChange={setStartTimeCopy}
        selectedTime={startTimeCopy}
      />
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
