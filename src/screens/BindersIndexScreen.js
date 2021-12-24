import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ADD_BINDERS} from '../utils/auth';
import BinderColorSwatch from '../components/BinderColorSwatch';
import CircleButton from '../components/CircleButton';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import List from '../components/List';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import SearchFilterBar from '../components/SearchFilterBar';
import {getAllBinders} from '../services/bindersService';
import {reportError} from '../utils/error';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';

export default function BindersIndexScreen({navigation, route}) {
  const [query, setQuery] = useState('');
  const [binders, setBinders] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentMember = useSelector(selectCurrentMember);

  useEffect(() => {
    if (route?.params?.created) {
      setBinders(currentBinders => [...currentBinders, route.params.created]);
      navigation.navigate('Binder Detail', route.params.created);
    }

    if (route?.params?.deleted) {
      setBinders(currentBinders => {
        let idToDelete = route.params.deleted.id;
        return currentBinders.filter(binder => binder.id !== idToDelete);
      });
    }
  }, [route?.params?.created, navigation, route?.params?.deleted]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getAllBinders();
        setBinders(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleNavigateTo(binder) {
    navigation.navigate('Binder Detail', binder);
  }

  function renderBinderRow({item: binder}) {
    return (
      <Container size="lg">
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleNavigateTo(binder)}>
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
      </Container>
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

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <SearchFilterBar
            query={query}
            onQueryChange={setQuery}
            placeholder={`Search ${binders?.length} binders`}
          />
        }
        data={filteredBinders()}
        renderItem={renderBinderRow}
        ListEmptyComponent={
          <NoDataMessage
            message="You have no binders yet"
            showAddButton={currentMember.can(ADD_BINDERS)}
            buttonTitle="Add binder"
            onButtonPress={handleCreateBinder}
          />
        }
      />
      {currentMember.can(ADD_BINDERS) && (
        <CircleButton style={styles.addButton} onPress={handleCreateBinder}>
          <Icon name="plus" size={35} color="white" />
        </CircleButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
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
