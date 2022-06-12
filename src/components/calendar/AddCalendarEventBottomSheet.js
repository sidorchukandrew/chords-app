import {StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet from '../BottomSheet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AddCalendarEventBottomSheetScreen from '../../screens/AddCalendarEventBottomSheetScreen';
import {useTheme} from '../../hooks/useTheme';
import StartTimeBottomSheetScreen from '../../screens/StartTimeBottomSheetScreen';
import EndTimeBottomSheetScreen from '../../screens/EndTimeBottomSheetScreen';
import MembersPickerBottomSheetScreen from '../../screens/MembersPickerBottomSheetScreen';
import ReminderTimesPickerBottomSheet from '../../screens/ReminderTimesPickerBottomSheet';

const Stack = createNativeStackNavigator();
export const AddEventContext = React.createContext();
export const BottomSheetContext = React.createContext();

export default function AddCalendarEventBottomSheet({
  visible,
  onDismiss,
  onCreated,
}) {
  const sheetRef = useRef();
  const {isDark, surface, text} = useTheme();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [members, setMembers] = useState([]);
  const [reminderDate, setReminderDate] = useState(1);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible]);

  function handleDismiss() {
    setStartTime(null);
    setEndTime(null);
    setMembers([]);
    setReminderDate(1);
    sheetRef.current?.dismiss();
    onDismiss();
  }

  function handleEventCreated(event) {
    onCreated(event);
    handleDismiss();
  }

  return (
    <BottomSheet ref={sheetRef} onDismiss={handleDismiss} snapPoints={['85%']}>
      <AddEventContext.Provider
        value={{
          startTime,
          setStartTime,
          endTime,
          setEndTime,
          members,
          setMembers,
          reminderDate,
          setReminderDate,
          onCreated: handleEventCreated,
        }}>
        <BottomSheetContext.Provider value={{onDismiss: handleDismiss}}>
          <NavigationContainer
            independent
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                background: isDark ? surface.secondary : surface.primary,
              },
            }}>
            <Stack.Navigator
              screenOptions={{
                headerStyle: isDark ? surface.secondary : surface.primary,
                headerTitleStyle: text.primary,
              }}>
              <Stack.Screen
                name="Add Event"
                component={AddCalendarEventBottomSheetScreen}
                options={() => ({
                  title: 'New Event',
                })}
              />
              <Stack.Screen
                name="Start Time"
                component={StartTimeBottomSheetScreen}
                options={{title: 'Choose Time', headerShadowVisible: false}}
              />
              <Stack.Screen
                name="End Time"
                component={EndTimeBottomSheetScreen}
                options={{title: 'Choose Time', headerShadowVisible: false}}
              />
              <Stack.Screen
                name="Add Members"
                component={MembersPickerBottomSheetScreen}
                options={{title: 'Choose Members', headerShadowVisible: false}}
              />
              <Stack.Screen
                name="Reminder Time"
                component={ReminderTimesPickerBottomSheet}
                options={{title: 'Choose Time', headerShadowVisible: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetContext.Provider>
      </AddEventContext.Provider>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});
