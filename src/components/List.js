import React from 'react';
import {FlatList, StyleSheet, Dimensions} from 'react-native';

export default function List({items, renderSmallScreen, renderLargeScreen}) {
  const windowWidth = Dimensions.get('window').width;

  return (
    <FlatList
      style={styles.list}
      data={items}
      renderItem={windowWidth > 500 ? renderLargeScreen : renderSmallScreen}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
});
