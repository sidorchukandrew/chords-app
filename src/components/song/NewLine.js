import {Text} from 'react-native';
import React from 'react';

export default function NewLine({format}) {
  return (
    <Text
      allowFontScaling={false}
      style={{
        height: format.font_size * 1.5,
      }}
    />
  );
}
