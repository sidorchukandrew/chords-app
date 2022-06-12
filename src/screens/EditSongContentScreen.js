import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

import Container from '../components/Container';
import LoadingIndicator from '../components/LoadingIndicator';
import {reportError} from '../utils/error';
import {updateSong} from '../services/songsService';
import {FONTS} from '../utils/song';
import {useNetInfo} from '@react-native-community/netinfo';
import CustomKeyboardAvoidingView from '../components/CustomKeyboardAvoidingView';
import {useTheme} from '../hooks/useTheme';

export default function EditSongContentScreen({navigation, route}) {
  const [localContent, setLocalContent] = useState(
    route?.params?.content || '',
  );
  const [song, setSong] = useState(route?.params);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const {isConnected} = useNetInfo();
  const {text, surface, blue} = useTheme();

  const handleGoBack = useCallback(() => {
    navigation.navigate('Song Detail', song);
  }, [song, navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: surface.primary,
      headerTitleStyle: text.primary,
      headerRight: () => (
        <TouchableOpacity
          style={styles.saveButton}
          disabled={!dirty}
          onPress={handleSave}>
          {saving ? (
            <LoadingIndicator />
          ) : (
            <Text
              style={[
                styles.saveButtonText,
                blue.text,
                (!dirty || !isConnected) && text.disabled,
              ]}>
              Save
            </Text>
          )}
        </TouchableOpacity>
      ),
      headerLeft: props => (
        <TouchableOpacity {...props} onPress={handleGoBack}>
          <Text style={[styles.saveButtonText, blue.text]}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    dirty,
    saving,
    handleGoBack,
    localContent,
    isConnected,
    surface,
    text,
    blue,
  ]);

  function handleContentChange(newContent) {
    setDirty(true);
    setLocalContent(newContent);
  }

  async function handleSave() {
    try {
      setSaving(true);
      await updateSong(song.id, {content: localContent});
      setDirty(false);
      setSong(currentSong => ({...currentSong, content: localContent}));
    } catch (error) {
      reportError(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Container size="lg" style={[styles.container, surface.primary]}>
      <CustomKeyboardAvoidingView>
        <TextInput
          value={localContent}
          onChangeText={handleContentChange}
          multiline
          style={[
            styles.input,
            text.primary,
            {fontFamily: FONTS[song.format?.font].regular},
          ]}
          placeholder="Start typing here"
        />
      </CustomKeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  input: {
    height: '100%',
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 18,
  },
  saveButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  saveButtonText: {
    fontWeight: '600',
    fontSize: 17,
  },
  disabledText: {
    color: '#d0d0d0',
  },
});
