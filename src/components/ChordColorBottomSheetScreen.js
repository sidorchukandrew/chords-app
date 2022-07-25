import {ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useTheme} from '../hooks/useTheme';
import ColorPicker from './color_picker/ColorPicker';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSongOnScreen,
  storeFormatEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import _ from 'lodash';
import {EDIT_SONGS} from '../utils/auth';
import {selectCurrentMember} from '../redux/slices/authSlice';

export default function ChordColorBottomSheetScreen() {
  const {surface, isDark} = useTheme();
  const {format, id} = useSelector(selectSongOnScreen);
  const [selectedColor, setSelectedColor] = useState(format.chord_color);
  const dispatch = useDispatch();
  const currentMember = useSelector(selectCurrentMember);

  function handleChange(newColor) {
    setSelectedColor(newColor);
    debounce(newColor);
  }

  // eslint-disable-next-line
  const debounce = useCallback(
    _.debounce(
      newColor => {
        let updatedFormat = {...format, chord_color: newColor};
        dispatch(updateSongOnScreen({format: updatedFormat}));

        if (currentMember.can(EDIT_SONGS)) {
          let edits = {
            songId: id,
            updates: {
              chord_color: newColor,
            },
          };
          dispatch(storeFormatEdits(edits));
        }
      },
      [600],
    ),
    [dispatch, format, updateSongOnScreen, storeFormatEdits, id, currentMember],
  );
  return (
    <ScrollView
      style={[styles.container, isDark ? surface.secondary : surface.primary]}>
      <ColorPicker color={selectedColor} onChange={handleChange} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
