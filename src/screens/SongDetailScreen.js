import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  addToRecentlyViewedSongs,
  deleteSong,
  getSongById,
} from '../services/songsService';

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
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {VIEW_FILES} from '../utils/auth';
import SongFilesTab from '../components/SongFilesTab';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from '../hooks/useTheme';

export default function SongDetailScreen({navigation, route}) {
  const [tab, setTab] = useState('Song');
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [song, setSong] = useState(route.params);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [files, setFiles] = useState([]);
  const currentSubscription = useSelector(selectCurrentSubscription);
  const currentMember = useSelector(selectCurrentMember);
  const dispatch = useDispatch();
  const {isConnected} = useNetInfo();
  const {surface, text, blue} = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          setLoading(true);
          let data = await getSongById(song.id);
          setSong(data);
          addToRecentlyViewedSongs(data);
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
      headerStyle: surface.primary,
      headerTitleStyle: text.primary,
      title: song?.name,
      headerRight: () => (
        <TouchableOpacity
          style={[{padding: 3, borderRadius: 50}, surface.tertiary]}
          onPress={() => setOptionsSheetVisible(true)}>
          <Icon name="dots-horizontal" size={22} color="#2464eb" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, text, surface, blue, song?.name]);

  function handlePerformSong() {
    dispatch(setSongOnScreen(song));
    navigation.navigate('Perform Song', song);
  }

  function handleEditSong() {
    navigation.navigate('Edit Song Content', song);
  }

  function handleFilesUploaded(uploadedFiles) {
    setFiles(uploadedFiles);
  }

  function handleShowPrintModal() {
    dispatch(setSongOnScreen(song));
    navigation.navigate('Print Song');
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
          isConnected={isConnected}
        />
      );
    } else if (tab === 'Files') {
      return (
        <SongFilesTab
          files={files}
          song={song}
          onFilesLoaded={setFiles}
          onFilesUploaded={handleFilesUploaded}
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

  function canViewFiles() {
    return currentSubscription.isPro && currentMember.can(VIEW_FILES);
  }

  return (
    <>
      <Container size="lg" style={[{flexGrow: 0}, surface.primary]}>
        <SegmentedControl
          options={['Song', 'Details', canViewFiles() && 'Files']}
          selected={tab}
          onPress={setTab}
          style={styles.tabContainer}
        />
      </Container>
      <View style={[styles.container, surface.primary]}>
        {loading ? <LoadingIndicator /> : renderTab()}
      </View>
      <SongOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
        onDelete={() => setConfirmDeleteVisible(true)}
        onPrint={handleShowPrintModal}
        isConnected={isConnected}
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
  },
  tabContainer: {
    marginBottom: 10,
  },
});
