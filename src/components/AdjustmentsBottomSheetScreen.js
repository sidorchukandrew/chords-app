import {StyleSheet, Text, View} from 'react-native';
import {
  selectSongOnScreen,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import Divider from './Divider';
import FormatDetailButton from './FormatDetailButton';
import React from 'react';
import ToggleField from './ToggleField';

export default function AdjustmentsBottomSheetScreen({navigation}) {
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();

  function handleUpdateField(field, value) {
    dispatch(updateSongOnScreen({[field]: value}));
  }

  function handleUpdateFormat(formatField, value) {
    let updatedFormat = {...song.format, [formatField]: value};
    dispatch(updateSongOnScreen({format: updatedFormat}));
  }

  return (
    <View style={styles.container}>
      <ToggleField
        label="Show chords"
        enabled={!song.format?.chords_hidden}
        onChange={newValue => handleUpdateFormat('chords_hidden', !newValue)}
        style={styles.field}
      />
      <ToggleField
        label="Show roadmap"
        enabled={!song.show_roadmap}
        onChange={newValue => handleUpdateField('show_roadmap', !newValue)}
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
    </View>
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
});
