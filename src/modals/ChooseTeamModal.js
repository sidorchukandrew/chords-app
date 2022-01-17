import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {clearAllBinders, getAllBinders} from '../services/bindersService';
import {clearAllSetlists, getAllSetlists} from '../services/setlistsService';
import {clearAllSongs, getAllSongs} from '../services/songsService';
import {
  loginTeam,
  selectCurrentTeam,
  setMembership,
} from '../redux/slices/authSlice';
import {setMemberInStorage, setTeamInStorage} from '../services/authService';
import {useDispatch, useSelector} from 'react-redux';

import AccentButton from '../components/AccentButton';
import Container from '../components/Container';
import CreateTeamBottomSheet from '../components/CreateTeamBottomSheet';
import ItemSeparator from '../components/ItemSeparator';
import LoadingIndicator from '../components/LoadingIndicator';
import ScreenModal from './ScreenModal';
import ScreenModalHeader from '../components/ScreenModalHeader';
import TeamLoginOption from '../components/TeamLoginOption';
import TeamsApi from '../api/teamsApi';
import UsersApi from '../api/usersApi';
import {getAllTeams} from '../services/teamsService';
import {reportError} from '../utils/error';
import {setSubscription} from '../redux/slices/subscriptionSlice';

export default function ChooseTeamModal({navigation}) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentTeam = useSelector(selectCurrentTeam);
  const dispatch = useDispatch();
  const [createTeamSheetVisible, setCreateTeamSheetVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getAllTeams();
        setTeams(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function renderTeamRow({item: team}) {
    return (
      <TeamLoginOption
        team={team}
        selected={team.id === currentTeam.id}
        onPress={() => handleLoginTeam(team)}
      />
    );
  }

  async function handleLoginTeam(team) {
    if (currentTeam.id === team.id) return;

    dispatch(loginTeam(team));
    try {
      let teamResult = await TeamsApi.getCurrentTeam();
      dispatch(loginTeam(teamResult.data.team));
      setTeamInStorage(teamResult.data.team);

      dispatch(setSubscription(teamResult.data.subscription));

      let membershipResult = await UsersApi.getTeamMembership();
      dispatch(setMembership({role: membershipResult.data.role}));
      setMemberInStorage({role: membershipResult.data.role});

      clearAllBinders();
      clearAllSetlists();
      clearAllSongs();

      await getAllSongs({refresh: true});
      await getAllBinders({refresh: true});
      await getAllSetlists({refresh: true});

      navigation.pop();
    } catch (error) {
      reportError(error);
    }
  }

  return (
    <ScreenModal>
      <ScreenModalHeader
        onBackPress={() => navigation.pop()}
        title="Teams list"
        options={{saveVisible: false, backVisible: true}}
      />
      <Container size="sm">
        {loading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={teams}
            renderItem={renderTeamRow}
            ItemSeparatorComponent={ItemSeparator}
          />
        )}
      </Container>
      <Container size="sm" style={styles.buttonContainer}>
        <AccentButton onPress={() => setCreateTeamSheetVisible(true)}>
          Create new team
        </AccentButton>
      </Container>
      <CreateTeamBottomSheet
        visible={createTeamSheetVisible}
        onDismiss={() => setCreateTeamSheetVisible(false)}
        navigation={navigation}
      />
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexGrow: 0,
    paddingVertical: 20,
  },
});
