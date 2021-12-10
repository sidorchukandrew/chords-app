import React from 'react';
import {StyleSheet, View} from 'react-native';
import Container from './Container';
import List from './List';

export default function PreviousSetsList({
  sets,
  renderSmallScreen,
  renderLargeScreen,
}) {
  return (
    <Container size="lg">
      <List
        items={sets}
        renderLargeScreen={renderLargeScreen}
        renderSmallScreen={renderSmallScreen}
        noItemsMessage="No sets to show"
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
