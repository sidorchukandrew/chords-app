import {StyleSheet, View} from 'react-native';
import React from 'react';
import UpcomingSetsWidget from './UpcomingSetsWidget';
import RecentlyViewedSongsWidget from './RecentlyViewedSongsWidget';

export default function DashboardWidgets({navigation}) {
  return (
    <View style={styles.container}>
      <UpcomingSetsWidget navigation={navigation} />
      <RecentlyViewedSongsWidget navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeaea',
    paddingVertical: 20,
  },
});
