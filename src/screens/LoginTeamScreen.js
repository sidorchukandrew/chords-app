import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import AccentButton from '../components/AccentButton';
import Container from '../components/Container';
import TeamLoginOption from '../components/TeamLoginOption';
import {loginTeam} from '../redux/slices/authSlice';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();

  function handleLoginTeam(team) {
    dispatch(loginTeam(team));
  }

  function handleNavigateToCreateTeam() {
    navigation.navigate('Create Team');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.formContainer} size="sm">
        <Text style={styles.title}>Choose a team to login to</Text>
        {teams.map((team, index) => (
          <TeamLoginOption
            key={team.id}
            name={team.name}
            bordered={index < teams.length - 1}
            onPress={() => handleLoginTeam(team)}
          />
        ))}
      </Container>
      <View style={styles.buttonContainer}>
        <Container size="sm">
          <AccentButton onPress={handleNavigateToCreateTeam}>
            Create new team
          </AccentButton>
        </Container>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 25,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingVertical: 30,
  },
});

const teams = [
  {id: 1, name: 'Youth Worship'},
  {id: 2, name: 'Young Adults'},
];
