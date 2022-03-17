import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {reportError} from '../utils/error';
import {
  addFilesToSong,
  deleteFileFromSong,
  getFilesForSong,
} from '../services/filesService';
import LoadingIndicator from './LoadingIndicator';
import NoDataMessage from './NoDataMessage';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {ADD_FILES} from '../utils/auth';
import FileRow from './FileRow';
import CircleButton from './CircleButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from './Container';
import ItemSeparator from './ItemSeparator';
import FileOptionsBottomSheet from './FileOptionsBottomSheet';
import RenameFileBottomSheet from './RenameFileBottomSheet';
import {useTheme} from '../hooks/useTheme';

export default function SongFilesTab({
  song,
  files,
  onFilesLoaded,
  onFilesUploaded,
}) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fileOptionsSheetVisible, setFileOptionsSheetVisible] = useState(false);
  const [fileForOptionsSheet, setFileForOptionsSheet] = useState();
  const [renameFileSheetVisible, setRenameFileSheetVisible] = useState(false);
  const {surface} = useTheme();

  const currentMember = useSelector(selectCurrentMember);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getFilesForSong(song.id);
        onFilesLoaded(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    if (files?.length === 0) {
      fetchData();
    }
  }, []);

  async function handleRefresh() {
    try {
      setRefreshing(true);
      let {data} = await getFilesForSong(song.id);
      onFilesLoaded(data);
    } catch (error) {
      reportError(error);
    } finally {
      setRefreshing(false);
    }
  }

  async function handleOpenDocumentPicker() {
    try {
      const selectedFiles = await DocumentPicker.pickMultiple({
        presentationStyle: 'fullScreen',
      });

      uploadFiles(selectedFiles);
    } catch (error) {
      reportError(error, {showError: false});
    }
  }

  async function uploadFiles(selectedFiles) {
    try {
      let {data} = await addFilesToSong(selectedFiles, song.id);
      onFilesUploaded(data);
    } catch (error) {
      reportError(error);
    }
  }

  if (loading) return <LoadingIndicator />;

  if (files.length === 0) {
    return (
      <NoDataMessage
        message="No files have been added to this song yet"
        showAddButton={currentMember.can(ADD_FILES)}
        buttonTitle="Upload files"
        onButtonPress={handleOpenDocumentPicker}
      />
    );
  }

  function renderFileRow({item}) {
    return (
      <FileRow
        file={item}
        onOptionsPress={() => {
          setFileOptionsSheetVisible(true);
          setFileForOptionsSheet(item);
        }}
      />
    );
  }

  async function handleDelete(fileToDelete) {
    try {
      let updatedFilesList = files.filter(file => file.id !== fileToDelete.id);
      onFilesLoaded(updatedFilesList);
      await deleteFileFromSong(fileToDelete.id, song.id);
    } catch (error) {
      reportError(error);
    }
  }

  async function handleRenamed(renamedFile) {
    let updatedFiles = files.map(file =>
      file.id === renamedFile.id ? renamedFile : file,
    );
    onFilesLoaded(updatedFiles);
  }

  return (
    <View style={[styles.container, surface.primary]}>
      <Container size="lg" style={{flex: 1}} innerStyle={{flex: 1}}>
        <FlatList
          data={files}
          renderItem={renderFileRow}
          ItemSeparatorComponent={ItemSeparator}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
        {currentMember.can(ADD_FILES) && (
          <CircleButton
            style={styles.addButton}
            onPress={handleOpenDocumentPicker}>
            <Icon name="plus" size={35} color="white" />
          </CircleButton>
        )}
      </Container>
      <FileOptionsBottomSheet
        visible={fileOptionsSheetVisible}
        onDismiss={() => setFileOptionsSheetVisible(false)}
        file={fileForOptionsSheet}
        onDelete={handleDelete}
        onRename={() => setRenameFileSheetVisible(true)}
      />
      <RenameFileBottomSheet
        file={fileForOptionsSheet}
        visible={renameFileSheetVisible}
        onDismiss={() => setRenameFileSheetVisible(false)}
        song={song}
        onRenamed={handleRenamed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    position: 'relative',
    flexGrow: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
