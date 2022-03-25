import {StyleSheet, FlatList, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {getEightYearsOfMonths} from '../../utils/calendar';
import Month from './Month';
import CalendarHeader from './CalendarHeader';

export default function Calendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(48);
  const [monthItemHeight, setMonthItemHeight] = useState(0);
  const [months] = useState(() => getEightYearsOfMonths());
  const listRef = useRef();
  const onViewableItemsChanged = useRef(({viewableItems}) =>
    setCurrentMonthIndex(viewableItems[0]?.index),
  );

  function renderMonthItem({item: month}) {
    return <Month height={monthItemHeight} month={month} />;
  }

  function getItemLayout(data, index) {
    return {length: monthItemHeight, offset: monthItemHeight * index, index};
  }

  function handleTodayPress() {
    listRef.current.scrollToIndex({index: 48, animated: true});
  }

  return (
    <View style={styles.container}>
      <CalendarHeader
        month={months[currentMonthIndex]}
        onTodayPress={handleTodayPress}
      />
      <FlatList
        ref={listRef}
        initialScrollIndex={48}
        data={months}
        renderItem={renderMonthItem}
        onLayout={e => setMonthItemHeight(e.nativeEvent.layout.height)}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
