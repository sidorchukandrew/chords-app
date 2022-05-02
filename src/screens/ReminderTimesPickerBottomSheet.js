import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useCallback, useContext, useLayoutEffect, useState} from 'react';
import {AddEventContext} from '../components/calendar/AddCalendarEventBottomSheet';
import ItemSeparator from '../components/ItemSeparator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export default function ReminderTimesPickerBottomSheet({navigation}) {
  const {reminderDate, setReminderDate} = useContext(AddEventContext);
  const [reminderDateCopy, setReminderDateCopy] = useState(reminderDate);
  const {text, blue} = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        function handleConfirmTime() {
          setReminderDate(reminderDateCopy);
          navigation.goBack();
        }
        return (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmTime}>
            <Text style={[blue.text, styles.confirmText]}>Confirm</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [blue, navigation, setReminderDate, reminderDateCopy]);

  function renderTimeRow({item: time}) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => setReminderDateCopy(time.value)}>
        <Text style={[styles.timeText, text.primary]}>{time.template}</Text>
        {reminderDateCopy === time.value && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Icon name="check" size={22} color="#10b981" />
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={REMINDER_TIMES}
        keyExtractor={item => item.value}
        renderItem={renderTimeRow}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

export const REMINDER_TIMES = [
  {value: 1, template: '1 hour before'},
  {value: 2, template: '2 hours before'},
  {value: 6, template: '6 hours before'},
  {value: 24, template: '1 day before'},
  {value: 72, template: '3 days before'},
  {value: 168, template: '1 week before'},
];

const styles = StyleSheet.create({
  screen: {
    padding: 15,
  },
  row: {
    height: 50,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 15,
    fontWeight: '500',
  },
  confirmText: {
    fontWeight: '500',
    fontSize: 16,
  },
  confirmButton: {
    padding: 3,
  },
});
