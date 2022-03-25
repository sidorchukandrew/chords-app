import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks/useTheme';
import Tag from '../Tag';

function CalendarHeader({month, onTodayPress}) {
  console.log(month, ' header rerendered');
  const {text, border} = useTheme();

  function getMonthName() {
    return month?.split(' ')?.[0];
  }

  function getYear() {
    return month?.split(' ')?.[1];
  }
  return (
    <View style={[border.primary, styles.headerContainer]}>
      <View style={styles.headerFirstRow}>
        <View style={styles.headerTextContainer}>
          <Text style={[styles.monthText, text.primary]}>{getMonthName()}</Text>
          <Text style={[styles.yearText, text.primary]}>{getYear()}</Text>
        </View>
        <Tag tag="Today" onPress={onTodayPress} />
      </View>
      <View style={styles.dayNamesContainer}>
        <Text style={[text.secondary, styles.dayNameText]}>Sun</Text>
        <Text style={[text.secondary, styles.dayNameText]}>Mon</Text>
        <Text style={[text.secondary, styles.dayNameText]}>Tue</Text>
        <Text style={[text.secondary, styles.dayNameText]}>Wed</Text>
        <Text style={[text.secondary, styles.dayNameText]}>Thu</Text>
        <Text style={[text.secondary, styles.dayNameText]}>Fri</Text>
        <Text style={[text.secondary, styles.dayNameText]}>Sat</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
  },
  headerFirstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    flexDirection: 'row',
  },
  dayNamesContainer: {
    flexDirection: 'row',
  },
  dayNameText: {
    flex: 1,
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'right',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  monthText: {
    fontSize: 24,
    fontWeight: '700',
  },
  yearText: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default React.memo(
  CalendarHeader,
  (prevProps, nextProps) => prevProps.month === nextProps.month,
);
