import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DashboardWidget from './DashboardWidget';
import {useFocusEffect} from '@react-navigation/native';
import {reportError} from '../utils/error';
import {getAllSetlists} from '../services/setlistsService';
import {format, isPast, isToday, sortDates} from '../utils/date';
import NoDataMessage from './NoDataMessage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Tag from './Tag';
import ItemSeparator from './ItemSeparator';

export default function UpcomingSetsWidget({
  navigation,
  style: providedStyles,
}) {
  const [upcomingSets, setUpcomingSets] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      async function fetchUpcomingSets() {
        try {
          let allSets = (await getAllSetlists()) || [];
          allSets = allSets.sort((setA, setB) =>
            sortDates(setA.scheduled_date, setB.scheduled_date),
          );

          setUpcomingSets(allSets.filter(set => !isPast(set.scheduled_date)));
        } catch (error) {
          reportError(error);
        }
      }

      fetchUpcomingSets();
    }, []),
  );

  return (
    <DashboardWidget
      style={providedStyles}
      title="Upcoming sets"
      headerActionText="View all"
      onHeaderActionPress={() => navigation.navigate('Sets')}>
      {upcomingSets?.length === 0 ? (
        <NoDataMessage message="No sets to show" />
      ) : (
        <ScrollView style={{maxHeight: 130}}>
          {upcomingSets.map((set, index) => (
            <View key={set.id}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('Setlist Detail', set)}>
                <View>
                  <Text style={styles.name}>{set.name}</Text>
                  <View style={styles.detailsContainer}>
                    <View style={styles.detail}>
                      <Icon name="calendar-blank" size={16} color="#505050" />
                      <Text style={styles.detailText}>
                        {set.scheduled_date
                          ? format(set.scheduled_date, 'ddd MMM D')
                          : 'Not scheduled'}
                      </Text>
                    </View>
                    <View style={styles.detail}>
                      <IonIcon color="#505050" size={16} name="musical-notes" />
                      <Text style={styles.detailText}>{set.songs?.length}</Text>
                    </View>
                  </View>
                </View>
                {isToday(set.scheduled_date) && <Tag tag="Today" size="sm" />}
              </TouchableOpacity>
              {index < upcomingSets.length - 1 && <ItemSeparator />}
            </View>
          ))}
        </ScrollView>
      )}
    </DashboardWidget>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 5,
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
