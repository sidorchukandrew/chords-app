import React from 'react';
import Container from './Container';
import List from './List';

export default function UpcomingSetsList({
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
