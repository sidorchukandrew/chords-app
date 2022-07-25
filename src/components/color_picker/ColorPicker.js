import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import ColorGrid from './ColorGrid';
import OpacitySlider from './OpacitySlider';
import {combine, parse} from '../../utils/color';
import {useTheme} from '../../hooks/useTheme';

export default function ColorPicker({color, onChange}) {
  const {text} = useTheme();

  function handleColorChange(newColor) {
    let {r, g, b} = parse(newColor);
    let {a} = parse(color);

    let newCombined = combine({r, g, b, a});
    onChange(newCombined);
  }

  function handleOpacityChange(newOpacity) {
    let {r, g, b} = parse(color);
    let alpha = newOpacity / 100.0;

    let newColor = combine({r, g, b, a: alpha});
    onChange(newColor);
  }

  return (
    <View>
      <ColorGrid color={color} onChange={handleColorChange} />
      <OpacitySlider
        style={styles.opacityWrapper}
        color={color}
        onChange={handleOpacityChange}
      />

      <View style={styles.currentColorContainer}>
        <Text style={[styles.title, text.secondary]}>CURRENT COLOR</Text>
        <ImageBackground
          source={require('../../img/transparent.png')}
          style={styles.currentColor}>
          <View style={[{backgroundColor: color}, styles.colorBlock]} />
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  opacityWrapper: {
    marginVertical: 15,
  },
  currentColor: {
    height: 50,
    width: 50,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  colorBlock: {
    flex: 1,
  },
  currentColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
});
