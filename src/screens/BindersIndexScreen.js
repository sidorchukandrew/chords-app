import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CircleButton from '../components/CircleButton';
import Input from '../components/Input';
import List from '../components/List';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BinderColorSwatch from '../components/BinderColorSwatch';

export default function BindersIndexScreen() {
  const [query, setQuery] = useState('');
  function renderLargeScreen({item: binder}) {
    return (
      <Pressable style={styles.row}>
        <BinderColorSwatch color={binder.color} style={styles.colorSwatch} />
        <Text style={styles.name}>{binder.name}</Text>
      </Pressable>
    );
  }

  function renderSmallScreen({item: binder}) {
    return <Text>{binder.name}</Text>;
  }

  function filteredBinders() {
    const lowercasedQuery = query.toLowerCase();
    return binders.filter(binder =>
      binder.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search your binders"
        style={styles.searchInput}
        onChange={setQuery}
        value={query}
      />
      <List
        items={filteredBinders()}
        renderLargeScreen={renderLargeScreen}
        renderSmallScreen={renderSmallScreen}
      />

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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  colorSwatch: {
    marginRight: 15,
  },
});

const binders = [
  {id: 1, name: 'English Hymns', color: 'red'},
  {id: 2, name: 'Christmas', color: 'green'},
  {id: 3, name: 'Easter', color: 'blue'},
  {id: 4, name: 'Ukrainian Hymns', color: 'yellow'},
  {id: 5, name: 'English Contemporary', color: 'purple'},
];
