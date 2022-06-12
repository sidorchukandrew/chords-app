import {FlatList, StyleSheet, Text} from 'react-native';
import React, {useRef} from 'react';
import {
  selectSongOnScreen,
  storeFormatEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import {EDIT_SONGS} from '../utils/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemSeparator from '../components/ItemSeparator';
import RectButton from '../components/RectButton';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {useTheme} from '../hooks/useTheme';

const FONT_SIZES = [14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 28, 30];

export default function FontSizeBottomSheetScreen() {
  const song = useSelector(selectSongOnScreen);
  const currentMember = useSelector(selectCurrentMember);
  const dispatch = useDispatch();
  const {surface, text, isDark} = useTheme();

  const checkmarkIcon = useRef(
    <Icon name="check" size={22} color="#10b981" />,
  ).current;

  function handleSizeChange(newSize) {
    if (newSize !== song.format?.font_size) {
      let updatedFormat = {...song.format, font_size: newSize};
      dispatch(updateSongOnScreen({format: updatedFormat}));

      if (currentMember.can(EDIT_SONGS)) {
        let edits = {
          songId: song.id,
          updates: {
            font_size: newSize,
          },
        };
        dispatch(storeFormatEdits(edits));
      }
    }
  }

  function handleRenderRow({item: size}) {
    return (
      <RectButton onPress={() => handleSizeChange(size)} styles={styles.button}>
        <Text style={[styles.fontSize, text.primary]}>{size}</Text>
        {song.format?.font_size === size && checkmarkIcon}
      </RectButton>
    );
  }

  return (
    <FlatList
      data={FONT_SIZES}
      keyExtractor={item => item}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={handleRenderRow}
      style={[styles.container, isDark ? surface.secondary : surface.primary]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  fontSize: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
