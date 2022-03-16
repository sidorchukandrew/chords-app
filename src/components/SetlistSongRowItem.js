import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import KeyBadge from './KeyBadge';
import {OpacityDecorator} from 'react-native-draggable-flatlist';
import React from 'react';
import SwipeListDeleteButton from './SwipeListDeleteButton';
import SwipeableItem from 'react-native-swipeable-item';
import {hasAnyKeysSet} from '../utils/song';
import {useTheme} from '../hooks/useTheme';

export default function SetlistSongRowItem({
  item: song,
  drag,
  isActive,
  onNavigateToSong,
  itemRefs,
  onRemove,
  editable,
  isConnected,
}) {
  const {surface, text} = useTheme();

  return (
    <OpacityDecorator>
      <SwipeableItem
        swipeEnabled={editable}
        key={song.id}
        item={song}
        ref={ref => {
          if (ref && !itemRefs.current.get(song.id)) {
            itemRefs.current.set(song.id, ref);
          }
        }}
        renderUnderlayLeft={() => (
          <View style={styles.hiddenRow}>
            <SwipeListDeleteButton
              onPress={() => onRemove(song.id)}
              enabled={isConnected}
            />
          </View>
        )}
        snapPointsLeft={[75]}>
        <TouchableHighlight
          style={[styles.row, surface.primary]}
          onPress={() => onNavigateToSong(song)}
          underlayColor={surface.primary.color}
          onLongPress={editable && isConnected ? drag : null}
          disabled={isActive}>
          <>
            <Text style={[styles.songName, text.primary]} numberOfLines={1}>
              {song.name}
            </Text>
            {hasAnyKeysSet(song) && (
              <KeyBadge style={styles.keyBadge}>
                {song.transposed_key || song.original_key}
              </KeyBadge>
            )}
          </>
        </TouchableHighlight>
      </SwipeableItem>
    </OpacityDecorator>
  );
}

const styles = StyleSheet.create({
  songName: {
    fontSize: 17,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 10,
  },
  keyBadge: {
    marginLeft: 10,
  },
  hiddenRow: {
    alignItems: 'flex-end',
  },
});
