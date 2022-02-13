import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  loginTeam,
  setCurrentUser,
  setMembership,
} from '../redux/slices/authSlice';
import {
  setMemberInStorage,
  setSubscriptionInStorage,
  setTeamInStorage,
} from '../services/authService';

import Button from '../components/Button';
import Container from '../components/Container';
import FormField from '../components/FormField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TeamsApi from '../api/teamsApi';
import UsersApi from '../api/usersApi';
import {createTeam} from '../services/teamsService';
import {reportError} from '../utils/error';
import {setSubscription} from '../redux/slices/subscriptionSlice';
import {useDispatch} from 'react-redux';
import * as Sentry from '@sentry/react-native';

export default function CreateTeamScreen({navigation}) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function handleCreateTeam() {
    try {
      setLoading(true);
      let {data} = await createTeam({name});
      dispatch(loginTeam({...data, members: []}));

      let userResult = await UsersApi.getCurrentUser();
      dispatch(setCurrentUser(userResult.data));
      Sentry.setUser(userResult.data);

      let teamResult = await TeamsApi.getCurrentTeam();
      dispatch(
        loginTeam({...teamResult.data.team, members: teamResult.data.members}),
      );
      setTeamInStorage({
        ...teamResult.data.team,
        members: teamResult.data.members,
      });

      dispatch(setSubscription(teamResult.data.subscription));
      setSubscriptionInStorage(teamResult.data.subscription);

      let membershipResult = await UsersApi.getTeamMembership();
      dispatch(setMembership({role: membershipResult.data.role}));
      setMemberInStorage({role: membershipResult.data.role});
    } catch (error) {
      reportError(error);
    } finally {
      setLoading(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Container style={styles.formContainer} size="sm">
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="chevron-left" size={16} color="#505050" />
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Give your team a name</Text>
        <FormField label="Name" onChange={setName} value={name} />
      </Container>
      <View style={styles.buttonContainer}>
        <Container size="sm">
          <Button onPress={handleCreateTeam} loading={loading} disabled={!name}>
            Create
          </Button>
        </Container>
      </View>
    </View>
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
  backButton: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
    color: '#505050',
  },
});
