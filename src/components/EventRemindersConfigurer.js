import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../hooks/useTheme';
import Toggle from './Toggle';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getNameOrEmail} from '../utils/member';
import FormField from './FormField';
import {REMINDER_TIMES} from '../screens/ReminderTimesPickerBottomSheet';

export default function EventRemindersConfigurer({
  remindersEnabled,
  onEnabledChange,
  members,
  navigation,
  reminderDate,
}) {
  const {border, icon, blue, text} = useTheme();

  return (
    <>
      <View style={[styles.section, border.primary]}>
        <View style={styles.toggleContainer}>
          <Text style={[styles.label, {color: icon.secondary}]}>Reminders</Text>
          <Toggle enabled={remindersEnabled} onChange={onEnabledChange} />
        </View>
      </View>
      {remindersEnabled && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View style={[styles.section, border.primary]}>
            <TouchableOpacity
              style={styles.membersTitleContainer}
              onPress={() => navigation.navigate('Add Members')}>
              <Text style={[styles.label, {color: icon.secondary}]}>
                Members
              </Text>

              <Icon color={blue.text.color} size={20} name="plus" />
            </TouchableOpacity>
            {members?.map(member => (
              <View key={member.id} style={styles.memberRow}>
                <Text style={[styles.memberText, text.primary]}>
                  {getNameOrEmail(member.user)}
                </Text>
              </View>
            ))}
          </View>
          <FormField
            label="Send reminder"
            value={
              REMINDER_TIMES.find(time => time.value === reminderDate)?.template
            }
            onPress={() => navigation.navigate('Reminder Time')}
          />
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  section: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plusButton: {
    padding: 5,
  },
  membersTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberText: {
    fontSize: 16,
    fontWeight: '500',
  },
  memberRow: {
    paddingVertical: 8,
  },
});
