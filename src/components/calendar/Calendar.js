import {StyleSheet, FlatList, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  getFourYearsOfMonths,
  getEventsForMonth,
  isMonthIndexNearby,
} from '../../utils/calendar';
import Month from './Month';
import CalendarHeader from './CalendarHeader';
import MonthPlaceholder from './MonthPlaceholder';

const TODAYS_MONTH = 24;
export default function Calendar({events, onDeleted}) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(TODAYS_MONTH);
  const [monthItemHeight, setMonthItemHeight] = useState(0);
  const [monthRows, setMonthRows] = useState(() => getFourYearsOfMonths());
  const listRef = useRef();
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    const newMonths = [];

    for (let i = 0; i < monthRows.length; ++i) {
      newMonths.push({
        month: monthRows[i].month,
        shouldRender: isMonthIndexNearby(i, viewableItems[0]?.index),
      });
    }

    setMonthRows(newMonths);
    setCurrentMonthIndex(viewableItems[0]?.index);
  });

  function renderMonthItem({item: monthRow}) {
    if (monthRow.shouldRender) {
      let eventsForMonth = getEventsForMonth(monthRow.month, events);
      return (
        <Month
          height={monthItemHeight}
          month={monthRow.month}
          events={eventsForMonth}
          onDeleted={onDeleted}
        />
      );
    } else {
      return (
        <MonthPlaceholder month={monthRow.month} height={monthItemHeight} />
      );
    }
  }

  function getItemLayout(data, index) {
    return {length: monthItemHeight, offset: monthItemHeight * index, index};
  }

  function handleTodayPress() {
    setCurrentMonthIndex(TODAYS_MONTH);
    listRef.current.scrollToIndex({index: TODAYS_MONTH, animated: true});
  }

  return (
    <View style={styles.container}>
      <CalendarHeader
        month={monthRows[currentMonthIndex]?.month}
        onTodayPress={handleTodayPress}
      />
      <FlatList
        ref={listRef}
        initialScrollIndex={TODAYS_MONTH}
        data={monthRows}
        renderItem={renderMonthItem}
        onLayout={e => setMonthItemHeight(e.nativeEvent.layout.height)}
        getItemLayout={getItemLayout}
        initialNumToRender={1}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 20,
        }}
        keyExtractor={monthRow => monthRow.month}
        removeClippedSubviews
        maxToRenderPerBatch={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
