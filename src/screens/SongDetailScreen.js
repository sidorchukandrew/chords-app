import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {deleteSong, getSongById} from '../services/songsService';

import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingIndicator from '../components/LoadingIndicator';
import SegmentedControl from '../components/SegmentedControl';
import SongContentTab from '../components/SongContentTab';
import SongDetailsTab from '../components/SongDetailsTab';
import SongOptionsBottomSheet from '../components/SongOptionsBottomSheet';
import {reportError} from '../utils/error';
import {setSongOnScreen} from '../redux/slices/performanceSlice';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

export default function SongDetailScreen({navigation, route}) {
  const [tab, setTab] = useState('Song');
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [song, setSong] = useState(route.params);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          setLoading(true);
          let data = await getSongById(song.id);
          setSong(data);
        } catch (error) {
          reportError(error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, [song.id]),
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{backgroundColor: '#eaeaea', padding: 3, borderRadius: 50}}
          onPress={() => setOptionsSheetVisible(true)}>
          <Icon name="dots-horizontal" size={22} color="#2464eb" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  function handlePerformSong() {
    dispatch(setSongOnScreen(song));
    navigation.navigate('Perform Song', song);
  }

  function handleEditSong() {
    navigation.navigate('Edit Song Content', song);
  }

  function renderTab() {
    if (tab === 'Song') {
      return (
        <SongContentTab
          song={song}
          onPerform={handlePerformSong}
          onEdit={handleEditSong}
        />
      );
    } else if (tab === 'Details') {
      return (
        <SongDetailsTab
          song={song}
          onNavigateTo={handleNavigateTo}
          onUpdateSong={handleUpdateSong}
          navigation={navigation}
        />
      );
    }
  }

  function handleUpdateSong(updates) {
    setSong(currentSong => ({...currentSong, ...updates}));
  }

  function handleNavigateTo(route) {
    navigation.navigate(route, song);
  }

  async function handleDelete() {
    try {
      setDeleting(true);
      await deleteSong(song.id);
      navigation.navigate('Songs');
    } catch (error) {
      reportError(error);
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Container size="lg">
          <SegmentedControl
            options={['Song', 'Details']}
            selected={tab}
            onPress={setTab}
            style={styles.tabContainer}
          />
        </Container>
        {loading ? <LoadingIndicator /> : renderTab()}
      </ScrollView>
      <SongOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
        onDelete={() => setConfirmDeleteVisible(true)}
      />
      <ConfirmDeleteModal
        visible={confirmDeleteVisible}
        onDismiss={() => setConfirmDeleteVisible(false)}
        message="Are you sure you'd like to delete this song? This action is irreversible."
        deleting={deleting}
        onDelete={handleDelete}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContainer: {
    marginBottom: 20,
  },
});
