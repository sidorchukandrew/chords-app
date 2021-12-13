import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Container from './Container';
import Button from './Button';

export default function NoDataMessage({buttonTitle, message, onButtonPress}) {
  return (
    <Container size="sm">
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>{message}</Text>
        <Button onPress={onButtonPress}>
          <Text>{buttonTitle}</Text>
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  noDataContainer: {
    height: '100%',
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
