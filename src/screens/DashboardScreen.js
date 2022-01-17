import {ScrollView, StyleSheet, Text, View} from 'react-native';

import DashboardScreenProfilePicture from '../components/DashboardScreenProfilePicture';
import DashboardScreenTitle from '../components/DashboardScreenTitle';
import React from 'react';

export default function DashboardScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <DashboardScreenTitle
          onOpenTeamsModal={() => navigation.navigate('Choose Team')}
        />
      ),
      headerLeft: () => <DashboardScreenProfilePicture />,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text>Dashboard</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
