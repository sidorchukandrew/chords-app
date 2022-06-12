import {StyleSheet, View} from 'react-native';
import React from 'react';
import UpcomingSetsWidget from './UpcomingSetsWidget';
import RecentlyViewedSongsWidget from './RecentlyViewedSongsWidget';
import {useTheme} from '../hooks/useTheme';

export default function DashboardWidgets({navigation}) {
  const {surface, isDark} = useTheme();
  return (
    <View style={[styles.container, !isDark && surface.tertiary]}>
      <UpcomingSetsWidget navigation={navigation} />
      <RecentlyViewedSongsWidget navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
