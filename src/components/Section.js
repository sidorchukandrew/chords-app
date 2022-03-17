import {StyleSheet, Text, View} from 'react-native';

import Container from './Container';
import React from 'react';
import {useTheme} from '../hooks/useTheme';

export default function Section({title, children, button, showButton}) {
  const {text} = useTheme();

  return (
    <Container style={styles.sectionContainer} size="lg">
      <View style={styles.headerContainer}>
        <Text style={[styles.sectionTitle, text.primary]}>{title}</Text>
        {showButton && button}
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
  },
  sectionContainer: {
    marginBottom: 10,
  },
});
