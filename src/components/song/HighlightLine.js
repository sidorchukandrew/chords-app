import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getStyles, isChord} from '../../utils/song';

export default function HighlightLine({line, style: providedStyles, format}) {
  function buildChordStyles() {
    const chordLineStyles = getStyles(format, line);
    delete chordLineStyles.backgroundColor;
    const colorStyles = chordLineStyles.color && {color: chordLineStyles.color};

    return [
      chordLineStyles,
      providedStyles,
      colorStyles,
      {
        lineHeight: format.font_size * 1.5,
      },
    ];
  }

  function buildLine() {
    const chordStyles = buildChordStyles();
    let tokens = line.split(/(\s+)/);
    tokens = tokens.map((token, index) =>
      isChord(token) ? (
        <View key={index}>
          <Text style={chordStyles}>{token}</Text>
          <Text
            style={[
              styles.highlight,
              {
                backgroundColor: format.highlight_color,
              },
            ]}
          />
        </View>
      ) : (
        <Text key={index} style={chordStyles}>
          {token}
        </Text>
      ),
    );

    return tokens;
  }

  return <View style={styles.line}>{buildLine()}</View>;
}

const styles = StyleSheet.create({
  line: {
    display: 'flex',
    flexDirection: 'row',
  },
  highlight: {
    position: 'absolute',
    left: -4,
    right: -4,
    zIndex: -1,
    elevation: -1,
    top: 1,
    bottom: 1,
  },
});
