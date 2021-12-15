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
import {getAllSetlists} from '../services/setlistsService';
import {reportError} from '../utils/error';
import LoadingIndicator from '../components/LoadingIndicator';

export default function SetlistsIndexScreen({navigation}) {
  const [setType, setSetType] = useState('Upcoming');
  const [query, setQuery] = useState('');
  const [upcomingSets, setUpcomingSets] = useState([]);
  const [pastSets, setPastSets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data: sets} = await getAllSetlists();
        let upcoming = [];
        let past = [];

        sets?.forEach(set =>
          isPast(set.scheduled_date) ? past.push(set) : upcoming.push(set),
        );
        setUpcomingSets(upcoming);
        setPastSets(past);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function renderSetRow({item: set}) {
    return (
      <View style={styles.rowBorder}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleNavigateTo(set)}>
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

  function handleNavigateTo(set) {
    navigation.navigate('Setlist Detail', set);
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

  function renderContent() {
    if (loading) return <LoadingIndicator />;
    else if (setType === 'Upcoming') {
      return (
        <UpcomingSetsList
          sets={filteredUpcomingSets()}
          renderLargeScreen={renderSetRow}
          renderSmallScreen={renderSetRow}
        />
      );
    } else {
      return (
        <PreviousSetsList
          sets={filteredPastSets()}
          renderLargeScreen={renderSetRow}
          renderSmallScreen={renderSetRow}
        />
      );
    }
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
      {renderContent()}
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
