import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  clearEditsForSong,
  selectFormatEdits,
  selectSongEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {createFormat, updateFormat} from '../services/formatsService';
import {useDispatch, useSelector} from 'react-redux';

import SaveChangesBottomSheet from './SaveChangesBottomSheet';
import {isEmpty} from '../utils/object';
import {reportError} from '../utils/error';
import {updateSong} from '../services/songsService';
import {
  createCapoForSong,
  deleteCapoFromSong,
  updateCapo,
} from '../services/caposService';

export default function SaveChangesBottomBar({song}) {
  const opacity = useRef(new Animated.Value(1)).current;
  const formatEdits = useSelector(selectFormatEdits);
  const songEdits = useSelector(selectSongEdits);
  const dispatch = useDispatch();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  if (
    (isEmpty(formatEdits[`${song?.id}`]) &&
      isEmpty(songEdits[`${song?.id}`])) ||
    !song
  )
    return null;

  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.1,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]),
  ).start();

  function handleCancel() {
    dispatch(clearEditsForSong(song.id));
  }

  async function handleSave() {
    try {
      setSaving(true);
      if (formatEdits[song.id]) {
        await saveFormatChanges();
      }

      if (songEdits[song.id]) {
        await saveSongChanges();
      }
      setSheetVisible(false);
      dispatch(clearEditsForSong(song.id));
    } catch (error) {
      reportError(error);
    } finally {
      setSaving(false);
    }
  }

  async function saveFormatChanges() {
    let format = formatEdits[song.id];
    if (song.format?.id) {
      await updateFormat(song.id, song.format.id, format);
    } else {
      let createdFormat = await createFormat(song.id, format);
      dispatch(updateSongOnScreen({format: createdFormat}));
    }
  }

  async function saveSongChanges() {
    let updates = songEdits[song.id];
    if ('capo_key' in updates) {
      await saveCapoChanges(updates);
      delete updates.capo_key;
    }
    await updateSong(song.id, updates);
  }

  async function saveCapoChanges({capo_key: updatedCapoKey, capoId}) {
    if (updatedCapoKey === null && capoId) {
      await deleteCapoFromSong(capoId, song.id);
    } else if (updatedCapoKey !== null && song?.capo?.id) {
      let updatedCapo = await updateCapo(song.capo.id, song.id, updatedCapoKey);
      dispatch(updateSongOnScreen({capo: updatedCapo}));
    } else if (updatedCapoKey !== null && !song?.capo?.id) {
      let createdCapo = await createCapoForSong(updatedCapoKey, song.id);
      dispatch(updateSongOnScreen({capo: createdCapo}));
    }
  }

  return (
    <>
      <Animated.View
        style={{
          backgroundColor: '#2464eb',
          paddingVertical: 1,
          opacity: opacity,
        }}>
        <Pressable onPress={() => setSheetVisible(true)}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
            Save changes
          </Text>
        </Pressable>
      </Animated.View>
      <SaveChangesBottomSheet
        visible={sheetVisible}
        onDismiss={() => setSheetVisible(false)}
        onCancel={handleCancel}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}

const styles = StyleSheet.create({});
