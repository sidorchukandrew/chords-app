import React from 'react';
import {StyleSheet, View} from 'react-native';
import List from './List';

export default function PreviousSetsList({
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
