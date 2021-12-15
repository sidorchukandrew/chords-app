import React from 'react';
import {FlatList, StyleSheet, Dimensions, Text} from 'react-native';

export default function List({
  items,
  renderSmallScreen,
  renderLargeScreen,
  noItemsMessage,
}) {
  const windowWidth = Dimensions.get('window').width;

  return items?.length > 0 ? (
    <FlatList
      style={styles.list}
      data={items}
      renderItem={windowWidth > 500 ? renderLargeScreen : renderSmallScreen}
    />
  ) : (
    <Text style={styles.noDataText}>{noItemsMessage || 'Nothing to Show'}</Text>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
  noDataText: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 14,
  },
});
