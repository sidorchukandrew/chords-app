import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet from './BottomSheet';
import FormField from './FormField';
import {reportError} from '../utils/error';
import {updateFileForSong} from '../services/filesService';
import LoadingIndicator from './LoadingIndicator';
import {useTheme} from '../hooks/useTheme';

export default function RenameFileBottomSheet({
  visible,
  onDismiss,
  file,
  song,
  onRenamed,
}) {
  const [localName, setLocalName] = useState(getFileNameWithoutExtension());
  const [saving, setSaving] = useState(false);
  const sheetRef = useRef();
  const {blue} = useTheme();

  useEffect(() => {
    setLocalName(getFileNameWithoutExtension());
  }, [file]);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function getFileNameWithoutExtension() {
    return file?.name.split('.')[0] || '';
  }

  function getFileExtension() {
    let fileParts = file?.name?.split('.');
    let lastIndex = fileParts.length - 1;
    return fileParts[lastIndex] || '';
  }

  function handleDismiss() {
    setLocalName(getFileNameWithoutExtension());
    sheetRef.current?.dismiss();
    onDismiss();
  }

  async function handleConfirmRename() {
    try {
      setSaving(true);
      await updateFileForSong(file.id, song.id, {name: localName});
      onRenamed({...file, name: `${localName}.${getFileExtension()}`});
      handleDismiss();
    } catch (error) {
      reportError(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      onDismiss={onDismiss}
      dynamicHeight
      snapPoints={['CONTENT_HEIGHT']}>
      <View style={styles.sheet}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleDismiss}>
            <Text style={[styles.headerButtonText, blue.text]}>Cancel</Text>
          </TouchableOpacity>
          {saving ? (
            <LoadingIndicator style={{flex: 0}} />
          ) : (
            <TouchableOpacity onPress={handleConfirmRename}>
              <Text style={[styles.headerButtonText, blue.text]}>Confirm</Text>
            </TouchableOpacity>
          )}
        </View>
        <FormField label="Name" value={localName} onChange={setLocalName} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  headerButtonText: {
    fontWeight: '500',
  },
});
