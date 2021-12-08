import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CircleButton from '../components/CircleButton';
import IonIcon from 'react-native-vector-icons/Ionicons';
import List from '../components/List';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BinderColorSwatch from '../components/BinderColorSwatch';
import Container from '../components/Container';
import SearchFilterBar from '../components/SearchFilterBar';

export default function BindersIndexScreen({navigation}) {
  const [query, setQuery] = useState('');

  function renderBinderRow({item: binder}) {
    return (
      <TouchableOpacity style={styles.row}>
        <BinderColorSwatch color={binder.color} style={styles.colorSwatch} />
        <View style={{width: '100%'}}>
          <Text style={styles.name}>{binder.name}</Text>
          {/* <View style={styles.binderDetailsContainer}>
            <View style={styles.detailContainer}>
              <IonIcon name="musical-notes" size={18} color="#505050" />
              <Text style={styles.detailText}>{binder.songs?.length}</Text>
            </View>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  }

  function filteredBinders() {
    const lowercasedQuery = query.toLowerCase();
    return binders.filter(binder =>
      binder.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  function handleCreateBinder() {
    navigation.navigate('Create Binder');
  }

  return (
    <View style={styles.container}>
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder={`Search ${binders?.length} binders`}
      />
      <Container size="lg">
        <List
          items={filteredBinders()}
          renderLargeScreen={renderBinderRow}
          renderSmallScreen={renderBinderRow}
        />
      </Container>
      <CircleButton style={styles.addButton} onPress={handleCreateBinder}>
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
    color: 'black',
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10, //remove later
    borderBottomWidth: 1, // remove later
    borderBottomColor: '#e0e0e0', // remove later
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  colorSwatch: {
    marginRight: 15,
  },
  binderDetailsContainer: {
    marginTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  detailText: {
    marginLeft: 7,
    color: '#505050',
  },
});

const binders = [
  {id: 1, name: 'English Hymns', color: 'red', songs: ['', '', '']},
  {
    id: 2,
    name: 'Christmas',
    color: 'green',
    songs: [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
  },
  {id: 3, name: 'Easter', color: 'blue', songs: []},
  {
    id: 4,
    name: 'Ukrainian Hymns',
    color: 'yellow',
    songs: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  },
  {
    id: 5,
    name: 'English Contemporary',
    color: 'purple',
    songs: [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
  },
];
