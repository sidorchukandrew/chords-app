import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ADD_BINDERS} from '../utils/auth';
import BinderColorSwatch from '../components/BinderColorSwatch';
import CircleButton from '../components/CircleButton';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemSeparator from '../components/ItemSeparator';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import SearchFilterBar from '../components/SearchFilterBar';
import {getAllBinders} from '../services/bindersService';
import {reportError} from '../utils/error';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from '../hooks/useTheme';

export default function BindersIndexScreen({navigation}) {
  const [query, setQuery] = useState('');
  const [binders, setBinders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const currentMember = useSelector(selectCurrentMember);
  const {isConnected} = useNetInfo();
  const {surface, text} = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          setLoading(true);
          let data = await getAllBinders();
          setBinders(data);
        } catch (error) {
          reportError(error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, []),
  );

  function handleNavigateTo(binder) {
    navigation.navigate('Binder Detail', binder);
  }

  function renderBinderRow({item: binder}) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => handleNavigateTo(binder)}>
        <BinderColorSwatch color={binder.color} style={styles.colorSwatch} />
        <View style={{width: '100%'}}>
          <Text style={[styles.name, text.primary]}>{binder.name}</Text>
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

  async function handleRefresh() {
    try {
      setRefreshing(true);
      let data = await getAllBinders({refresh: true});
      setBinders(data);
    } catch (error) {
      reportError(error);
    } finally {
      setRefreshing(false);
    }
  }

  if (loading) return <LoadingIndicator />;

  return (
    <View style={[styles.container, surface.primary]}>
      <Container size="lg">
        <FlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListHeaderComponent={
            <SearchFilterBar
              query={query}
              onQueryChange={setQuery}
              placeholder={`Search ${binders?.length} binders`}
            />
          }
          ItemSeparatorComponent={ItemSeparator}
          data={filteredBinders()}
          renderItem={renderBinderRow}
          style={{height: '100%'}}
          ListEmptyComponent={
            <NoDataMessage
              message="You have no binders yet"
              showAddButton={currentMember.can(ADD_BINDERS)}
              buttonTitle="Add binder"
              onButtonPress={handleCreateBinder}
              disabled={!isConnected}
            />
          }
          ListHeaderComponentStyle={styles.headerContainer}
        />
      </Container>
      {currentMember.can(ADD_BINDERS) && (
        <CircleButton
          style={styles.addButton}
          onPress={handleCreateBinder}
          disabled={!isConnected}>
          <Icon name="plus" size={35} color="white" />
        </CircleButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  searchInput: {
    marginTop: 20,
    marginBottom: 15,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10, //remove later
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
  headerContainer: {
    marginBottom: 15,
  },
});
