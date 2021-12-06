import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import List from './List';

export default function UpcomingSetsList({
  sets,
  renderSmallScreen,
  renderLargeScreen,
}) {
  return (
    <View style={styles.container}>
      <List
        items={sets}
        renderLargeScreen={renderLargeScreen}
        renderSmallScreen={renderSmallScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
