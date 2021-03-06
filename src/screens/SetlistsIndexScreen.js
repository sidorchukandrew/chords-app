import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {format, isPast, sortDates} from '../utils/date';

import CircleButton from '../components/CircleButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import SearchFilterBar from '../components/SearchFilterBar';
import SegmentedControl from '../components/SegmentedControl';
import {getAllSetlists} from '../services/setlistsService';
import {reportError} from '../utils/error';
import {useFocusEffect} from '@react-navigation/native';
import Container from '../components/Container';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from '../hooks/useTheme';
import ContainedItemSeparator from '../components/ContainedItemSeparator';

export default function SetlistsIndexScreen({navigation, route}) {
  const [setType, setSetType] = useState('Upcoming');
  const [query, setQuery] = useState('');
  const [upcomingSets, setUpcomingSets] = useState([]);
  const [pastSets, setPastSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {isConnected} = useNetInfo();
  const {surface, text} = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          setLoading(true);
          let sets = await getAllSetlists();
          let upcoming = [];
          let past = [];

          sets?.forEach(set =>
            isPast(set.scheduled_date) ? past.push(set) : upcoming.push(set),
          );
          setUpcomingSets(
            upcoming.sort((setA, setB) =>
              sortDates(setA.scheduled_date, setB.scheduled_date),
            ),
          );
          setPastSets(
            past.sort((setA, setB) =>
              sortDates(setB.scheduled_date, setA.scheduled_date),
            ),
          );
        } catch (error) {
          reportError(error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, []),
  );

  async function handleRefresh() {
    try {
      setRefreshing(true);
      let sets = await getAllSetlists({refresh: true});
      let upcoming = [];
      let past = [];

      sets?.forEach(set =>
        isPast(set.scheduled_date) ? past.push(set) : upcoming.push(set),
      );
      setUpcomingSets(
        upcoming.sort((setA, setB) =>
          sortDates(setA.scheduled_date, setB.scheduled_date),
        ),
      );
      setPastSets(
        past.sort((setA, setB) =>
          sortDates(setB.scheduled_date, setA.scheduled_date),
        ),
      );
    } catch (error) {
      reportError(error);
    } finally {
      setRefreshing(false);
    }
  }

  function renderSetRow({item: set}) {
    return (
      <Container size="lg">
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleNavigateTo(set)}>
          <Text style={[styles.name, text.primary]}>{set.name}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <Icon
                name="calendar-blank"
                size={18}
                color={text.secondary.color}
              />
              <Text style={[styles.detailText, text.secondary]}>
                {set.scheduled_date
                  ? format(set.scheduled_date, 'ddd MMM D')
                  : 'Not scheduled'}
              </Text>
            </View>
            <View style={styles.detail}>
              <IonIcon
                color={text.secondary.color}
                size={18}
                name="musical-notes"
              />
              <Text style={[styles.detailText, text.secondary]}>
                {set.songs?.length}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Container>
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

  if (loading) return <LoadingIndicator />;

  return (
    <View style={[styles.container, surface.primary]}>
      <FlatList
        ListHeaderComponent={
          <>
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
          </>
        }
        data={
          setType === 'Upcoming' ? filteredUpcomingSets() : filteredPastSets()
        }
        renderItem={renderSetRow}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={<NoDataMessage message={'No sets to show'} />}
        ItemSeparatorComponent={ContainedItemSeparator}
        style={{height: '100%'}}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
            colors={['gray']}
            tintColor="gray"
          />
        }
      />

      <CircleButton
        style={styles.addButton}
        onPress={() => navigation.navigate('Create Setlist')}
        disabled={!isConnected}>
        <Icon name="plus" size={35} color="white" />
      </CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 10,
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

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  typePicker: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
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
