import {StyleSheet, View} from 'react-native';

import React from 'react';
import {buildContent} from '../utils/song';

function SongContent({song}) {
  console.log('Content rerendered');
  return <View style={styles.content}>{buildContent(song)}</View>;
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
});

// export default SongContent;

export default React.memo(SongContent, areEqual);

function areEqual(prevProps, nextProps) {
  const prevSong = prevProps.song;
  const nextSong = nextProps.song;

  return (
    prevSong.content === nextSong.content &&
    prevSong.show_transposed === nextSong.show_transposed &&
    prevSong.transposed_key === nextSong.transposed_key &&
    prevSong.capo === nextSong.capo &&
    prevSong.show_capo === nextSong.show_capo &&
    prevSong.chords_hidden === nextSong.chords_hidden &&
    prevSong.roadmap === nextSong.roadmap &&
    prevSong.show_roadmap === nextSong.show_roadmap &&
    prevSong.format === nextSong.format
  );
}
