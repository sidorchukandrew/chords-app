import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  loginTeam,
  setCurrentUser,
  setMembership,
} from '../redux/slices/authSlice';
import {
  setMemberInStorage,
  setTeamInStorage,
  setUserInStorage,
} from '../services/authService';

import AccentButton from '../components/AccentButton';
import Container from '../components/Container';
import LoadingIndicator from '../components/LoadingIndicator';
import TeamLoginOption from '../components/TeamLoginOption';
import TeamsApi from '../api/teamsApi';
import UsersApi from '../api/usersApi';
import {reportError} from '../utils/error';
import {setSubscription} from '../redux/slices/subscriptionSlice';
import {useDispatch} from 'react-redux';

export default function LoginTeamScreen({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingAllData, setLoadingAllData] = useState();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await TeamsApi.getAll();
        setTeams(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleLoginTeam(team) {
    dispatch(loginTeam({...team, members: []}));
    try {
      setLoadingAllData(true);

      let userResult = await UsersApi.getCurrentUser();
      dispatch(setCurrentUser(userResult.data));
      setUserInStorage(userResult.data);

      let teamResult = await TeamsApi.getCurrentTeam();
      dispatch(
        loginTeam({...teamResult.data.team, members: teamResult.data.members}),
      );
      setTeamInStorage({
        ...teamResult.data.team,
        members: teamResult.data.members,
      });

      dispatch(setSubscription(teamResult.data.subscription));

      let membershipResult = await UsersApi.getTeamMembership();
      dispatch(setMembership({role: membershipResult.data.role}));
      setMemberInStorage({role: membershipResult.data.role});
    } catch (error) {
      reportError(error);
    }
  }

  function handleNavigateToCreateTeam() {
    navigation.navigate('Create Team');
  }

  function renderContent() {
    if (loading) return <LoadingIndicator />;
    else if (!loading && teams.length === 0) {
      return (
        <View>
          <Text>Looks like you aren't a part of any teams yet.</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          {teams.map((team, index) => (
            <TeamLoginOption
              key={team.id}
              team={team}
              bordered={index < teams.length - 1}
              onPress={() => handleLoginTeam(team)}
            />
          ))}
        </ScrollView>
      );
    }
  }

  if (loadingAllData) return <LoadingIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.formContainer} size="sm">
        <Text style={styles.title}>Choose a team to login to</Text>
        {renderContent()}
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
