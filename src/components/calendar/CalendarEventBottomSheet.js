import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet from '../BottomSheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../hooks/useTheme';
import {ScrollView} from 'react-native-gesture-handler';
import {EVENT_COLORS} from './CalendarEvent';
import {format, getTimeFromDate} from '../../utils/date';
import {getNameOrEmail} from '../../utils/member';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../../redux/slices/authSlice';
import {EDIT_EVENTS} from '../../utils/auth';

export default function CalendarEventBottomSheet({
  visible,
  onDismiss,
  event,
  onDelete,
}) {
  const [startTime] = useState(getTimeFromDate(event.start_time));
  const [endTime] = useState(getTimeFromDate(event.end_time));
  const sheetRef = useRef();
  const {text} = useTheme();
  const currentMember = useSelector(selectCurrentMember);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [sheetRef, visible]);

  return (
    <BottomSheet ref={sheetRef} snapPoints={['85%']} onDismiss={onDismiss}>
      <View style={styles.sheetContainer}>
        <View style={styles.actionsContainer}>
          {/* <TouchableOpacity style={styles.action}>
            <Icon
              name="pencil-outline"
              size={22}
              color={text.secondary.color}
            />
          </TouchableOpacity> */}

          {currentMember.can(EDIT_EVENTS) && (
            <TouchableOpacity style={styles.action} onPress={onDelete}>
              <Icon name="delete" size={22} color={text.secondary.color} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.headerContainer, styles.row]}>
            <View style={styles.leftColumn}>
              <View
                style={[styles.colorIndicator, EVENT_COLORS[event.color]]}
              />
            </View>
            <View style={styles.rightColumn}>
              <Text style={[styles.titleText, text.primary]}>
                {event.title}
              </Text>
              <Text style={[text.secondary, styles.dateText]}>
                {format(event?.start_time, 'MMMM D, YYYY')}&nbsp;
                {startTime && '(' + startTime}
                {startTime && endTime && '-'}
                {!startTime && endTime && 'ends at '}
                {endTime}
                {startTime && ')'}
              </Text>
            </View>
          </View>
          <View style={[styles.membersContainer, styles.row]}>
            <View style={styles.leftColumn}>
              <Icon
                name="account-multiple"
                size={22}
                color={text.secondary.color}
              />
            </View>
            <View style={styles.rightColumn}>
              {event?.memberships?.length > 0 ? (
                event?.memberships?.map(membership => (
                  <Text
                    style={[styles.memberText, text.primary]}
                    key={membership.id}>
                    {getNameOrEmail(membership.user)}
                  </Text>
                ))
              ) : (
                <Text style={[styles.memberText, text.secondary]}>
                  No members
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.row]}>
            <View style={styles.leftColumn}>
              <Icon name="bell" size={22} color={text.secondary.color} />
            </View>
            {event.reminders_enabled ? (
              <Text
                style={[styles.sectionText, text.primary]}
                numberOfLines={2}>
                Reminders will be sent{' '}
                {format(event.reminder_date, 'MMMM D, YYYY h:mma')}
              </Text>
            ) : (
              <Text style={text.secondary}>
                Reminders are not enabled for this event
              </Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Icon name="text" size={22} color={text.secondary.color} />
            </View>
            <View>
              {event.description ? (
                <Text style={[styles.sectionText, text.primary]}>
                  {event.description}
                </Text>
              ) : (
                <Text style={text.secondary}>
                  No description provided for this event
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    padding: 15,
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  action: {
    padding: 8,
  },
  leftColumn: {
    width: 30,
    alignItems: 'flex-end',
    marginRight: 25,
    marginLeft: 10,
  },
  rightColumn: {
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  headerContainer: {flexDirection: 'row'},
  titleText: {
    fontWeight: '700',
    fontSize: 25,
  },
  colorIndicator: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  dateText: {
    fontWeight: '600',
    fontSize: 16,
  },
  memberText: {
    marginBottom: 8,
    fontSize: 17,
  },
  sectionText: {
    fontSize: 17,
    flex: 1,
    flexWrap: 'wrap',
  },
});
