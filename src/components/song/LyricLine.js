import {Text} from 'react-native';
import React from 'react';
import {getStyles} from '../../utils/song';

export default function LyricLine({line, format, style: providedStyles}) {
  const styles = getStyles(format, line);
  const colorStyles = styles.color && {color: styles.color};

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
