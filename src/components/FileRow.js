import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {reportError} from '../utils/error';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import LoadingIndicator from './LoadingIndicator';
import {useTheme} from '../hooks/useTheme';

export default function FileRow({file, onOptionsPress}) {
  const [downloading, setDownloading] = useState(false);
  const {text} = useTheme();

  async function handleDownloadAndView() {
    try {
      setDownloading(true);
      const toFile = `${RNFS.DocumentDirectoryPath}/${file.name}`;
      const fromUrl = file.url;

      await RNFS.downloadFile({toFile, fromUrl}).promise;
      FileViewer.open(toFile);
    } catch (error) {
      reportError(error);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.nameButton}
        onPress={handleDownloadAndView}>
        <Text style={[styles.nameText, text.primary]}>{file.name}</Text>
        {downloading && <LoadingIndicator style={styles.loadingIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsButton} onPress={onOptionsPress}>
        <Icon size={18} color={text.secondary.color} name="dots-horizontal" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
    overflow: 'hidden',
  },
  nameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
    flexGrow: 1,
    height: '100%',
  },
  nameText: {
    fontWeight: '500',
    fontSize: 15,
    color: 'black',
  },
  loadingIndicator: {
    flex: 0,
    marginLeft: 5,
  },
  optionsButton: {
    padding: 3,
    marginRight: 5,
  },
});
