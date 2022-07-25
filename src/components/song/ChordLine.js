import {Text} from 'react-native';
import React from 'react';
import {getStyles} from '../../utils/song';
import HighlightLine from './HighlightLine';

export default function ChordLine({line, format, style: providedStyles = {}}) {
  if (format.chords_hidden) {
    return null;
  }

  const styles = getStyles(format, line);
  const colorStyles = styles.color && {color: styles.color};

  if (format.highlight_color) {
    return <HighlightLine line={line} format={format} style={providedStyles} />;
  }

  return (
    <Text
      allowFontScaling={false}
      style={[
        styles,
        {
          lineHeight: format.font_size * 1.5,
        },
        providedStyles,
        colorStyles,
      ]}>
      {line}
    </Text>
  );
}
