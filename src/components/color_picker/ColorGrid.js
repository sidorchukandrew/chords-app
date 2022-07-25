import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, GRAYSCALE, parse} from '../../utils/color';

export default function ColorGrid({color, onChange}) {
  let {r, g, b} = parse(color);
  let rgba = `rgba(${r}, ${g}, ${b}, 1)`;

  function matches(defaultColor) {
    return rgba === defaultColor;
  }
  return (
    <View style={styles.rounded}>
      <View style={[styles.grid]}>
        {GRAYSCALE.map(defaultColor => (
          <TouchableOpacity
            key={defaultColor}
            style={[
              styles.color,
              {backgroundColor: defaultColor},
              {borderColor: defaultColor},
              matches(defaultColor) && styles.selected,
            ]}
            onPress={() => onChange?.(defaultColor)}
          />
        ))}
      </View>
      <View style={styles.grid}>
        {COLORS.map((colorPack, index) => (
          <View style={styles.colorPack} key={index}>
            {[...colorPack].reverse().map(defaultColor => (
              <TouchableOpacity
                key={defaultColor}
                style={[
                  styles.color,
                  {backgroundColor: defaultColor},
                  {borderColor: defaultColor},
                  matches(defaultColor) && styles.selected,
                ]}
                onPress={() => onChange?.(defaultColor)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rounded: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  color: {
    height: 35,
    flexGrow: 1,
    borderWidth: 2,
  },
  grid: {
    flexDirection: 'row',
  },
  colorPack: {
    flexGrow: 1,
  },
  selected: {
    borderColor: 'white',
  },
});
