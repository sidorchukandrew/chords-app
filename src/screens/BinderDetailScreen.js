import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import AddSongsToBinderBottomSheet from '../components/AddSongsToBinderBottomSheet';
import BinderDetailHeader from '../components/BinderDetailHeader';
import BinderOptionsBottomSheet from '../components/BinderOptionsBottomSheet';
import Container from '../components/Container';
import {EDIT_BINDERS} from '../utils/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyBadge from '../components/KeyBadge';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import {getBinderById} from '../services/bindersService';
import {hasAnyKeysSet} from '../utils/song';
import {reportError} from '../utils/error';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {useState} from 'react/cjs/react.development';

export default function BinderDetailScreen({navigation, route}) {
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [addSongsSheetVisible, setAddSongsSheetVisible] = useState(false);
  const [binder, setBinder] = useState(route.params);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const currentMember = useSelector(selectCurrentMember);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getBinderById(route.params.id);
        setBinder(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [route.params.id]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {currentMember.can(EDIT_BINDERS) && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setAddSongsSheetVisible(true)}>
              <Icon name="plus" size={22} color="#2464eb" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setOptionsSheetVisible(true)}>
            <Icon name="dots-horizontal" size={22} color="#2464eb" />
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation, currentMember]);

  function renderRow({item: song}) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => handleNavigateToSong(song)}>
        <Text style={styles.songName}>{song.name}</Text>
        {hasAnyKeysSet(song) && (
          <KeyBadge style={styles.keyBadge}>
            {song.transposed_key || song.original_key}
          </KeyBadge>
        )}
      </TouchableOpacity>
    );
  }

  function handleNavigateTo(routeName) {
    navigation.navigate(routeName, binder);
  }

  function handleNavigateToSong(song) {
    navigation.navigate('Song Detail', song);
  }

  function filteredSongs() {
    let lowercasedQuery = query.toLowerCase();
    return binder.songs?.filter(song =>
      song.name.toLowerCase().includes(lowercasedQuery),
    );
  }

  function renderNoData() {
    if (loading) {
      return <LoadingIndicator />;
    } else if (query && filteredSongs().length === 0) {
      return <Text>No songs were found</Text>;
    } else {
      return (
        <NoDataMessage
          buttonTitle="Add songs"
          onButtonPress={() => setAddSongsSheetVisible(true)}
          message="There are no songs in this binder yet"
          showAddButton={currentMember.can(EDIT_BINDERS)}
        />
      );
    }
  }

  function handleSongsAdded(songsAdded) {
    setBinder(currentBinder => ({
      ...binder,
      songs: [...binder.songs, ...songsAdded],
    }));
  }

  return (
    <View style={styles.container}>
      <Container size="lg">
        <FlatList
          style={{height: '100%'}}
          ListHeaderComponent={
            <BinderDetailHeader
              binder={binder}
              query={query}
              onQueryChange={setQuery}
            />
          }
          ListEmptyComponent={renderNoData}
          data={filteredSongs()}
          renderItem={renderRow}
        />
      </Container>
      <AddSongsToBinderBottomSheet
        visible={addSongsSheetVisible}
        onDismiss={() => setAddSongsSheetVisible(false)}
        selectedSongIds={binder.songs?.map(song => song.id)}
        binderId={binder.id}
        onSongsAdded={handleSongsAdded}
      />
      <BinderOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
        onNavigateTo={handleNavigateTo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerButton: {
    backgroundColor: '#eaeaea',
    padding: 3,
    borderRadius: 50,
    marginLeft: 15,
  },
  songName: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  keyBadge: {
    marginLeft: 10,
  },
});
