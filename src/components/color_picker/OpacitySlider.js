import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../hooks/useTheme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useState} from 'react';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {parse} from '../../utils/color';

export default function OpacitySlider({
  style: providedStyles,
  color,
  onChange,
}) {
  const {text} = useTheme();
  const [sliderWidth, setSliderWidth] = useState(280);

  const {a} = parse(color);
  let opacity = parseInt(a * 100, 10);

  return (
    <View style={providedStyles}>
      <Text style={[text.secondary, styles.title]}>OPACITY</Text>
      <View style={styles.trackContainer}>
        <ImageBackground
          source={require('../../img/transparent.png')}
          style={styles.track}
          onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}>
          <Svg height="100%" width="100%" style={styles.absoluteFill}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0" stopColor={color} stopOpacity={0} />
                <Stop offset="1" stopColor={color} stopOpacity={1} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" />
          </Svg>
          <MultiSlider
            containerStyle={styles.transparent}
            trackStyle={styles.hidden}
            markerStyle={styles.sliderThumb}
            sliderLength={sliderWidth - 40}
            min={0}
            step={1}
            max={101}
            onValuesChange={([newOpacity]) => onChange(newOpacity)}
            values={[opacity]}
          />
        </ImageBackground>
        <Text style={styles.percentText}>{opacity}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  track: {
    borderRadius: 30,
    height: 42,
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  percentText: {
    width: 40,
    textAlign: 'right',
    marginLeft: 5,
  },
  hidden: {
    height: 0,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  absoluteFill: {
    position: 'absolute',
  },
  sliderThumb: {
    height: 40,
    width: 40,
  },
});
