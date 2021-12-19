import {StyleSheet, Text, View} from 'react-native';

import Button from './Button';
import Container from './Container';
import React from 'react';

export default function NoDataMessage({
  buttonTitle,
  message,
  onButtonPress,
  showAddButton,
}) {
  return (
    <>
      <Container size="sm">
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{message}</Text>
          {showAddButton && (
            <Button onPress={onButtonPress}>
              <Text>{buttonTitle}</Text>
            </Button>
          )}
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  noDataContainer: {
    marginHorizontal: 10,
    marginVertical: 30,
    justifyContent: 'center',
  },
  noDataText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#404040',
  },
});
