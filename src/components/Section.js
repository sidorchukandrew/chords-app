import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Container from './Container';

export default function Section({title, children, button}) {
  return (
    <Container style={styles.sectionContainer} size="lg">
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {button}
      </View>
      <View>{children}</View>
    </Container>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
    marginVertical: 23,
    color: 'black',
  },
  sectionContainer: {
    marginBottom: 10,
  },
});
