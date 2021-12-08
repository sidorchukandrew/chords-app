import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PreviousSetsList from '../components/PreviousSetsList';
import SegmentedControl from '../components/SegmentedControl';
import UpcomingSetsList from '../components/UpcomingSetsList';
import SearchFilterBar from '../components/SearchFilterBar';
import dayjs from 'dayjs';
import {format, isPast} from '../utils/date';
import CircleButton from '../components/CircleButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function SetlistsIndexScreen({navigation}) {
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

  function renderSetRow({item: set}) {
    return (
      <View style={styles.rowBorder}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.name}>{set.name}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <Icon name="calendar-blank" size={18} color="#505050" />
              <Text style={styles.detailText}>
                {set.scheduled_date
                  ? format(set.scheduled_date, 'ddd MMM D')
                  : 'Not scheduled'}
              </Text>
            </View>
            <View style={styles.detail}>
              <IonIcon color="#505050" size={18} name="musical-notes" />
              <Text style={styles.detailText}>{set.songs?.length}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
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
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder={`Search ${
          setType === 'Upcoming'
            ? filteredUpcomingSets().length
            : filteredPastSets().length
        } sets`}
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
          renderLargeScreen={renderSetRow}
          renderSmallScreen={renderSetRow}
        />
      ) : (
        <PreviousSetsList
          sets={filteredPastSets()}
          renderLargeScreen={renderSetRow}
          renderSmallScreen={renderSetRow}
        />
      )}
      <CircleButton
        style={styles.addButton}
        onPress={() => navigation.navigate('Create Setlist')}>
        <Icon name="plus" size={35} color="white" />
      </CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  row: {
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
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  detail: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    color: '#505050',
    fontSize: 13,
  },
});

const sets = [
  {
    id: 1,
    name: 'Youth Service',
    scheduled_date: dayjs().subtract(2, 'day').toDate(),
    songs: [1, 2, 3, 4],
  },
  {id: 2, name: 'Church Service', scheduled_date: null, songs: [1, 2, 3]},
  {
    id: 3,
    name: 'Youth Service',
    scheduled_date: new Date(),
    songs: [1, 2, 3, 4],
  },
  {
    id: 4,
    name: 'Friendsgiving',
    scheduled_date: dayjs().subtract(12, 'day').toDate(),
    songs: [1, 2],
  },
  {
    id: 5,
    name: 'Christmas Party',
    scheduled_date: dayjs().add(12, 'day').toDate(),
    songs: [1, 2, 3],
  },
];
