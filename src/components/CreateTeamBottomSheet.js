import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {loginTeam, setMembership} from '../redux/slices/authSlice';
import {
  setMemberInStorage,
  setSubscriptionInStorage,
  setTeamInStorage,
} from '../services/authService';

import BottomSheet from './BottomSheet';
import Button from './Button';
import Container from './Container';
import FormField from './FormField';
import TeamsApi from '../api/teamsApi';
import UsersApi from '../api/usersApi';
import {clearAllBinders} from '../services/bindersService';
import {clearAllSetlists} from '../services/setlistsService';
import {clearAllSongs} from '../services/songsService';
import {createTeam} from '../services/teamsService';
import {reportError} from '../utils/error';
import {setSubscription} from '../redux/slices/subscriptionSlice';
import {useDispatch} from 'react-redux';

export default function CreateTeamBottomSheet({
  visible,
  onDismiss,
  navigation,
}) {
  const sheetRef = useRef();
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) {
      sheetRef.current?.present();
    }
  }, [visible, sheetRef]);

  async function handleCreate() {
    try {
      setCreating(true);

      let {data} = await createTeam({name});
      dispatch(loginTeam({...data, members: []}));

      let teamResult = await TeamsApi.getCurrentTeam();
      dispatch(
        loginTeam({...teamResult.data.team, members: teamResult.data.members}),
      );
      dispatch(setSubscription(teamResult.data.subscription));
      setSubscriptionInStorage(teamResult.data.subscription);
      setTeamInStorage({
        ...teamResult.data.team,
        members: teamResult.data.members,
      });

      let membershipResult = await UsersApi.getTeamMembership();
      dispatch(setMembership({role: membershipResult.data.role}));
      setMemberInStorage({role: membershipResult.data.role});

      clearAllBinders();
      clearAllSetlists();
      clearAllSongs();

      navigation.navigate('Dashboard');
    } catch (error) {
      setCreating(false);
      reportError(error);
    }
  }

  return (
    <BottomSheet onDismiss={onDismiss} snapPoints={['80%']} ref={sheetRef}>
      <Container>
        <Text style={styles.title}>New team</Text>
        <FormField label="Team name" value={name} onChange={setName} />
        <Button
          disabled={!name}
          style={styles.button}
          onPress={handleCreate}
          loading={creating}>
          <Text>Create</Text>
        </Button>
      </Container>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10,
  },
  button: {
    marginTop: 15,
  },
});
