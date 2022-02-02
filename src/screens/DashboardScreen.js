import {ScrollView, StyleSheet, Text, View} from 'react-native';

import DashboardScreenProfilePicture from '../components/DashboardScreenProfilePicture';
import DashboardScreenTitle from '../components/DashboardScreenTitle';
import React from 'react';
import Container from '../components/Container';
import DashboardWidgets from '../components/DashboardWidgets';

export default function DashboardScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <DashboardScreenTitle
          onOpenTeamsModal={() => navigation.navigate('Choose Team')}
        />
      ),
      headerLeft: () => (
        <DashboardScreenProfilePicture
          onNavigateToAccount={() => navigation.navigate('Account')}
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Container size="lg">
        <Text style={styles.dashboardText}>Dashboard</Text>
      </Container>
      <DashboardWidgets navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  dashboardText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
});
