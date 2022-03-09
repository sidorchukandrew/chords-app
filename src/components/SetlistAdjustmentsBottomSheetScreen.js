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
import {selectToolbars} from '../redux/slices/appearanceSlice';

export default function SetlistAdjustmentsBottomSheetScreen({navigation}) {
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();
  const currentMember = useSelector(selectCurrentMember);
  const currentSubscription = useSelector(selectCurrentSubscription);
  const toolbars = useSelector(selectToolbars);
  const [creatingNote, setCreatingNote] = useState(false);

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
      contentContainerStyle={styles.container}
      style={styles.container}>
      <ToggleField
        label="Show chords"
        enabled={!song.format?.chords_hidden}
        onChange={newValue => handleUpdateFormat('chords_hidden', !newValue)}
        style={styles.field}
      />
      <ToggleField
        label="Show roadmap"
        enabled={song.show_roadmap}
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
        enabled={song.format?.bold_chords}
        onChange={newValue => handleUpdateFormat('bold_chords', newValue)}
        style={styles.field}
      />
      <ToggleField
        label="Italic chords"
        enabled={song.format?.italic_chords}
        onChange={newValue => handleUpdateFormat('italic_chords', newValue)}
        style={styles.field}
      />
      <Divider size="sm" style={{flexGrow: 0}} />
      <ToggleField label="Show bottom navigation" style={styles.field} />
      {currentSubscription.isPro && (
        <RectButton
          styles={[styles.field, styles.actionButton]}
          onPress={handleCreateNote}>
          <View style={styles.actionButtonLeftContainer}>
            <Icon name="note-plus" size={22} color="#2464eb" />
            <Text style={styles.label}>Add note</Text>
          </View>
          {creatingNote && <LoadingIndicator style={{flexGrow: 0}} />}
        </RectButton>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
