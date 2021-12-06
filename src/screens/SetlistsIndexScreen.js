import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PreviousSetsList from '../components/PreviousSetsList';
import SegmentedControl from '../components/SegmentedControl';
import UpcomingSetsList from '../components/UpcomingSetsList';
import Input from '../components/Input';
import dayjs from 'dayjs';
import {isPast} from '../utils/date';
import CircleButton from '../components/CircleButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SetlistsIndexScreen() {
  const [setType, setSetType] = useState('Upcoming');
  const [query, setQuery] = useState('');
  const [upcomingSets, setUpcomingSets] = useState([]);
  const [pastSets, setPastSets] = useState([]);

  useEffect(() => {
    let upcoming = [];
    let past = [];
    sets?.forEach(set =>
      isPast(set.scheduled_date) ? past.push(set) : upcoming.push(set),
    );
    setUpcomingSets(upcoming);
    setPastSets(past);
  }, []);

  function renderLargeScreen({item: set}) {
    return (
      <View style={styles.rowBorder}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.name}>{set.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSmallScreen({item: set}) {
    return <Text>{set.name}</Text>;
  }

  function filteredUpcomingSets() {
    const lowercasedQuery = query.toLowerCase();
    return upcomingSets.filter(set =>
      set.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  function filteredPastSets() {
    const lowercasedQuery = query.toLowerCase();
    return pastSets.filter(set =>
      set.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  return (
    <View style={styles.container}>
      <Input
        value={query}
        onChange={setQuery}
        placeholder="Search your sets"
        style={styles.searchInput}
      />
      <View style={styles.typePicker}>
        <SegmentedControl
          options={['Upcoming', 'Past']}
          selected={setType}
          onPress={setSetType}
          style={{maxWidth: 200}}
        />
      </View>
      {setType === 'Upcoming' ? (
        <UpcomingSetsList
          sets={filteredUpcomingSets()}
          renderLargeScreen={renderLargeScreen}
          renderSmallScreen={renderSmallScreen}
        />
      ) : (
        <PreviousSetsList
          sets={filteredPastSets()}
          renderLargeScreen={renderLargeScreen}
          renderSmallScreen={renderSmallScreen}
        />
      )}
      <CircleButton style={styles.addButton}>
        <Icon name="plus" size={35} color="white" />
      </CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  searchInput: {
    marginTop: 20,
    marginBottom: 15,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  typePicker: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

const sets = [
  {
    id: 1,
    name: 'Youth Service',
    scheduled_date: dayjs().subtract(2, 'day').toDate(),
  },
  {id: 2, name: 'Church Service', scheduled_date: null},
  {id: 3, name: 'Youth Service', scheduled_date: new Date()},
  {
    id: 4,
    name: 'Friendsgiving',
    scheduled_date: dayjs().subtract(12, 'day').toDate(),
  },
  {
    id: 5,
    name: 'Christmas Party',
    scheduled_date: dayjs().add(12, 'day').toDate(),
  },
];
