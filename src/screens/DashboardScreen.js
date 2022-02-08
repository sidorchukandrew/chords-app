import {ScrollView, StyleSheet, Text} from 'react-native';

import DashboardScreenProfilePicture from '../components/DashboardScreenProfilePicture';
import DashboardScreenTitle from '../components/DashboardScreenTitle';
import React from 'react';
import Container from '../components/Container';
import DashboardWidgets from '../components/DashboardWidgets';
import {useSelector} from 'react-redux';
import {selectInitialLoadComplete} from '../redux/slices/authSlice';
import LoadingIndicator from '../components/LoadingIndicator';

export default function DashboardScreen({navigation}) {
  const initialLoadComplete = useSelector(selectInitialLoadComplete);

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
      {initialLoadComplete ? (
        <DashboardWidgets navigation={navigation} />
      ) : (
        <LoadingIndicator />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  dashboardText: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 20,
  },
});
