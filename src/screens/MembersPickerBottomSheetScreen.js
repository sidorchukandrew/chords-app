import {StyleSheet, Text, View} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';
import {AddEventContext} from '../components/calendar/AddCalendarEventBottomSheet';
import Checkbox from '../components/Checkbox';
import ItemSeparator from '../components/ItemSeparator';
import {pluralize} from '../utils/string';
import SearchFilterBar from '../components/SearchFilterBar';
import {getNameOrEmail} from '../utils/member';
import AccentButton from '../components/AccentButton';
import {reportError} from '../utils/error';
import {getMembersOnCurrentTeam} from '../services/teamsService';
import LoadingIndicator from '../components/LoadingIndicator';

export default function MembersPickerBottomSheetScreen({navigation}) {
  const {blue, text} = useTheme();
  const {members: addedMembers, setMembers} = useContext(AddEventContext);
  const [addedMembersCopy, setAddedMembersCopy] = useState(addedMembers);
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getMembersOnCurrentTeam();
        setAllMembers(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleConfirm = useCallback(() => {
    setMembers(addedMembersCopy);
    navigation.goBack();
  }, [setMembers, navigation, addedMembersCopy]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={[blue.text, styles.confirmText]}>Confirm</Text>
        </TouchableOpacity>
      ),
    });
  }, [blue, navigation, handleConfirm]);

  function renderMemberRow({item: member}) {
    return (
      <Checkbox
        disableBuiltInState={true}
        onPress={newValue => handleMemberToggled(newValue, member)}
        style={styles.checkbox}
        checked={isMemberChecked(member)}
        text={
          <View style={styles.row}>
            <Text style={[styles.memberText, text.primary]}>
              {getNameOrEmail(member.user)}
            </Text>
          </View>
        }
      />
    );
  }

  function isMemberChecked(member) {
    return !!addedMembersCopy.find(addedMember => addedMember.id === member.id);
  }

  function handleMemberToggled(checked, member) {
    if (checked) {
      setAddedMembersCopy(currentMembers => currentMembers.concat(member));
    } else {
      setAddedMembersCopy(currentMembers =>
        currentMembers.filter(memberInList => memberInList.id !== member.id),
      );
    }
  }

  function filteredMembers() {
    let lowercasedQuery = query.toLowerCase();

    return allMembers.filter(member => {
      let lowercasedName =
        `${member?.user?.first_name} ${member?.user?.last_name}`.toLowerCase();
      let lowercasedEmail = member?.user?.email.toLowerCase();

      return (
        lowercasedName.includes(lowercasedQuery) ||
        lowercasedEmail.includes(lowercasedQuery)
      );
    });
  }

  function handleCheckAll() {
    setAddedMembersCopy(allMembers);
  }

  function handleUncheckAll() {
    setAddedMembersCopy([]);
  }

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredMembers()}
        renderItem={renderMemberRow}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <SearchFilterBar
              query={query}
              onQueryChange={setQuery}
              placeholder={`Search ${allMembers?.length} ${pluralize(
                allMembers,
                'member',
              )}`}
            />
            <View style={styles.checkButtonsContainer}>
              <AccentButton
                onPress={handleCheckAll}
                style={styles.checkButton}
                textStyle={styles.checkButtonText}>
                Check all
              </AccentButton>
              <AccentButton
                onPress={handleUncheckAll}
                style={styles.checkButton}
                textStyle={styles.checkButtonText}>
                Uncheck all
              </AccentButton>
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
  },
  confirmText: {
    fontWeight: '500',
    fontSize: 16,
  },
  confirmButton: {
    padding: 3,
  },
  checkbox: {
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  memberText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerContainer: {
    marginBottom: 20,
  },
  checkButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkButton: {
    marginRight: 8,
    height: 30,
    paddingHorizontal: 8,
  },
  checkButtonText: {
    fontSize: 13,
  },
});
