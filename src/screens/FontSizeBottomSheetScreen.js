import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {
  selectSongOnScreen,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemSeparator from '../components/ItemSeparator';
import RectButton from '../components/RectButton';

const FONT_SIZES = [14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 28, 30];

export default function FontSizeBottomSheetScreen() {
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();

  const checkmarkIcon = useRef(
    <Icon name="check" size={22} color="#10b981" />,
  ).current;

  function handleSizeChange(newSize) {
    if (newSize !== song.format?.font_size) {
      let updatedFormat = {...song.format, font_size: newSize};
      dispatch(updateSongOnScreen({format: updatedFormat}));
    }
  }

  function handleRenderRow({item: size}) {
    return (
      <RectButton onPress={() => handleSizeChange(size)} styles={styles.button}>
        <Text style={styles.fontSize}>{size}</Text>
        {song.format?.font_size === size && checkmarkIcon}
      </RectButton>
    );
  }

  return (
    <FlatList
      data={FONT_SIZES}
      keyExtractor={item => item}
      style={styles.container}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={handleRenderRow}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  fontSize: {
    color: 'black',
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
});
