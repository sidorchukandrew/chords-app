import {StyleSheet, Text, View} from 'react-native';
import {
  selectSongOnScreen,
  storeFormatEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import Divider from './Divider';
import {EDIT_SONGS} from '../utils/auth';
import FormatDetailButton from './FormatDetailButton';
import React, {useState} from 'react';
import ToggleField from './ToggleField';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';
import RectButton from './RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {reportError} from '../utils/error';
import LoadingIndicator from './LoadingIndicator';
import {addNoteToSong} from '../services/notesService';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';

export default function AdjustmentsBottomSheetScreen({navigation}) {
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();
  const currentMember = useSelector(selectCurrentMember);
  const currentSubscription = useSelector(selectCurrentSubscription);
  const [creatingNote, setCreatingNote] = useState(false);
  const {surface, text, isDark, blue} = useTheme();

  function handleUpdateField(field, value) {
    dispatch(updateSongOnScreen({[field]: value}));
  }

  function handleUpdateFormat(formatField, value) {
    let updatedFormat = {...song.format, [formatField]: value};
    dispatch(updateSongOnScreen({format: updatedFormat}));

    if (currentMember.can(EDIT_SONGS)) {
      let edits = {
        songId: song.id,
        updates: {
          [formatField]: value,
        },
      };
      dispatch(storeFormatEdits(edits));
    }
  }

  async function handleCreateNote() {
    try {
      setCreatingNote(true);
      let data = await addNoteToSong(song.id, {x: 0, y: 0});
      console.log(data);
      let updatedNotes = song.notes?.concat(data) || [data];

      dispatch(updateSongOnScreen({notes: updatedNotes}));
    } catch (error) {
      reportError(error);
    } finally {
      setCreatingNote(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDark ? surface.secondary : surface.primary,
      ]}
      style={[styles.container, isDark ? surface.secondary : surface.primary]}>
      <ToggleField
        label="Show chords"
        value={!song.format?.chords_hidden}
        onChange={newValue => handleUpdateFormat('chords_hidden', !newValue)}
        style={styles.field}
      />
      <ToggleField
        label="Show roadmap"
        value={song.show_roadmap}
        onChange={newValue => handleUpdateField('show_roadmap', newValue)}
        style={styles.field}
      />
      <Divider size="sm" style={{flexGrow: 0}} />
      <FormatDetailButton
        label="Font"
        detail={song.format?.font}
        onPress={() => navigation.navigate('SongAdjustments Font')}
      />
      <FormatDetailButton
        label="Size"
        detail={song.format?.font_size}
        onPress={() => navigation.navigate('SongAdjustments FontSize')}
      />
      <Divider size="sm" style={{flexGrow: 0}} />
      <ToggleField
        label="Bold chords"
        value={song.format?.bold_chords}
        onChange={newValue => handleUpdateFormat('bold_chords', newValue)}
        style={styles.field}
      />
      <ToggleField
        label="Italic chords"
        value={song.format?.italic_chords}
        onChange={newValue => handleUpdateFormat('italic_chords', newValue)}
        style={styles.field}
      />
      {currentSubscription.isPro && (
        <>
          <Divider size="sm" style={{flexGrow: 0}} />
          <RectButton
            styles={[styles.field, styles.actionButton]}
            onPress={handleCreateNote}>
            <View style={styles.actionButtonLeftContainer}>
              <Icon name="note-plus" size={22} color={blue.text.color} />
              <Text style={[styles.label, text.primary]}>Add note</Text>
            </View>
            {creatingNote && <LoadingIndicator style={{flexGrow: 0}} />}
          </RectButton>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {
    paddingHorizontal: 10,
    height: 50,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginHorizontal: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtonLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
