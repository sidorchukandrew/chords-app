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

export default function MembersIndexScreen() {
  const currentTeam = useSelector(selectCurrentTeam);
  const currentMember = useSelector(selectCurrentMember);
  const [members, setMembers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (currentTeam?.members) setMembers(currentTeam.members);
  }, [currentTeam]);

  async function handleRefresh() {
    try {
      setRefreshing(true);
      let teamResult = await TeamsApi.getCurrentTeam();
      setTeamInStorage({
        ...teamResult.data.team,
        members: teamResult.data.members,
      });

      setMembers(teamResult.data.members);
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

  return (
    <Container size="lg" style={styles.container}>
      <FlatList
        renderItem={({item}) => (
          <MembersListRow member={item} me={currentMember.id === item.id} />
        )}
        data={filteredMembers()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <SearchFilterBar
            query={query}
            onQueryChange={setQuery}
            placeholder={`Search ${members.length} ${pluralize(
              members,
              'member',
            )}`}
          />
        }
        ListEmptyComponent={<NoDataMessage message="No members to show" />}
        style={{height: '100%'}}
        ListHeaderComponentStyle={styles.headerContainer}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  headerContainer: {
    marginBottom: 15,
  },
});
