import {StyleSheet, View} from 'react-native';
import React from 'react';
import Day from './Day';
import {useTheme} from '../../hooks/useTheme';

export default function Week({dates}) {
  const {border, isDark} = useTheme();
  return (
    <View
      style={[
        styles.weekContainer,
        isDark ? border.secondary : border.primary,
      ]}>
      <Day
        date={dates[0]}
        surfaceColor={
          isDark ? {backgroundColor: '#020202'} : {backgroundColor: '#f9fafb'}
        }
      />
      <Day date={dates[1]} />
      <Day date={dates[2]} />
      <Day date={dates[3]} />
      <Day date={dates[4]} />
      <Day date={dates[5]} />
      <Day
        border={false}
        date={dates[6]}
        surfaceColor={
          isDark ? {backgroundColor: '#020202'} : {backgroundColor: '#f9fafb'}
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  weekContainer: {flex: 1, flexDirection: 'row', borderBottomWidth: 1},
});
