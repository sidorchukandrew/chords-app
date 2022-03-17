import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  selectCurrentMember,
  selectCurrentTeam,
} from '../redux/slices/authSlice';

import Container from '../components/Container';
import ItemSeparator from '../components/ItemSeparator';
import MembersListRow from '../components/MembersListRow';
import NoDataMessage from '../components/NoDataMessage';
import SearchFilterBar from '../components/SearchFilterBar';
import TeamsApi from '../api/teamsApi';
import {pluralize} from '../utils/string';
import {reportError} from '../utils/error';
import {setTeamInStorage} from '../services/authService';
import {useSelector} from 'react-redux';
import {ADD_MEMBERS} from '../utils/auth';
import CircleButton from '../components/CircleButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNetInfo} from '@react-native-community/netinfo';
import SegmentedControl from '../components/SegmentedControl';
import PendingInvitationRow from '../components/PendingInvitationRow';
import {useFocusEffect} from '@react-navigation/native';
import InvitationsApi from '../api/invitationsApi';
import AddMembersBottomSheet from '../components/AddMembersBottomSheet';
import InviteByEmailBottomSheet from '../components/InviteByEmailBottomSheet';
import {useTheme} from '../hooks/useTheme';

export default function MembersIndexScreen() {
  const currentTeam = useSelector(selectCurrentTeam);
  const currentMember = useSelector(selectCurrentMember);
  const [members, setMembers] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const {isConnected} = useNetInfo();
  const [selectedTab, setSelectedTab] = useState('Members');
  const [addMembersSheetVisible, setAddMembersSheetVisible] = useState(false);
  const [inviteByEmailSheetVisible, setInviteByEmailSheetVisible] =
    useState(false);
  const {surface} = useTheme();

  useEffect(() => {
    if (currentTeam?.members) setMembers(currentTeam.members);
  }, [currentTeam]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          let {data} = await InvitationsApi.getAll();
          setPendingInvitations(data);
        } catch (error) {
          reportError(error);
        }
      }

      fetchData();
    }, []),
  );

  async function handleRefresh() {
    try {
      setRefreshing(true);
      let teamResult = await TeamsApi.getCurrentTeam();
      setTeamInStorage({
        ...teamResult.data.team,
        members: teamResult.data.members,
      });

      setMembers(teamResult.data.members);

      let invitationsResult = await InvitationsApi.getAll();
      setPendingInvitations(invitationsResult.data);
    } catch (error) {
      reportError(error);
    } finally {
      setRefreshing(false);
    }
  }

  function filteredMembers() {
    let lowercasedQuery = query.toLowerCase();

    return members.filter(member => {
      let lowercasedName =
        `${member.first_name} ${member.last_name}`.toLowerCase();
      let lowercasedEmail = member.email.toLowerCase();

      return (
        lowercasedName.includes(lowercasedQuery) ||
        lowercasedEmail.includes(lowercasedQuery)
      );
    });
  }

  function filteredInvitations() {
    let lowercasedQuery = query.toLowerCase();

    return pendingInvitations.filter(invitation =>
      invitation.email?.toLowerCase().includes(lowercasedQuery),
    );
  }

  function handleInvitationSent(invitation) {
    setPendingInvitations(currentInvitations => [
      invitation,
      ...currentInvitations,
    ]);
  }

  function handleInvitationDeleted(invitationToDelete) {
    setPendingInvitations(currentInvitations =>
      currentInvitations.filter(
        invitation => invitation.id !== invitationToDelete.id,
      ),
    );
  }

  function handleInvitationResent(updatedInvitation) {
    setPendingInvitations(currentInvitations =>
      currentInvitations.map(invitation =>
        invitation.id === updatedInvitation.id ? updatedInvitation : invitation,
      ),
    );
  }

  function renderRow({item}) {
    if (selectedTab === 'Members') {
      return <MembersListRow member={item} me={currentMember.id === item.id} />;
    } else {
      return (
        <PendingInvitationRow
          invitation={item}
          onDeleted={handleInvitationDeleted}
          onResent={handleInvitationResent}
        />
      );
    }
  }

  return (
    <>
      <Container size="lg" style={surface.primary}>
        <FlatList
          renderItem={renderRow}
          data={
            selectedTab === 'Members'
              ? filteredMembers()
              : filteredInvitations()
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={<NoDataMessage message="No members to show" />}
          ListHeaderComponentStyle={styles.headerContainer}
          ListHeaderComponent={
            <>
              <SearchFilterBar
                query={query}
                onQueryChange={setQuery}
                placeholder={`Search ${
                  selectedTab === 'Members'
                    ? members.length
                    : pendingInvitations.length
                } ${
                  selectedTab === 'Members'
                    ? pluralize(members, 'member')
                    : pluralize(pendingInvitations, 'invitation')
                }`}
              />
              <Container size="sm" style={styles.segmentedControl}>
                <SegmentedControl
                  options={['Members', 'Invitations']}
                  selected={selectedTab}
                  onPress={setSelectedTab}
                />
              </Container>
            </>
          }
          style={{height: '100%'}}
        />
      </Container>
      {currentMember.can(ADD_MEMBERS) && (
        <CircleButton
          style={styles.addButton}
          disabled={!isConnected}
          onPress={() => setAddMembersSheetVisible(true)}>
          <Icon name="plus" size={35} color="white" />
        </CircleButton>
      )}
      <AddMembersBottomSheet
        visible={addMembersSheetVisible}
        onDismiss={() => setAddMembersSheetVisible(false)}
        onInviteByEmail={() => setInviteByEmailSheetVisible(true)}
      />
      <InviteByEmailBottomSheet
        visible={inviteByEmailSheetVisible}
        onDismiss={() => setInviteByEmailSheetVisible(false)}
        members={members}
        pendingInvitations={pendingInvitations}
        onInvitationSent={handleInvitationSent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 15,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  segmentedControl: {
    marginVertical: 15,
  },
});
