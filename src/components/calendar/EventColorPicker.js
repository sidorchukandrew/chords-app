import {StyleSheet} from 'react-native';
import React from 'react';
import {EVENT_COLORS} from './CalendarEvent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export default function EventColorPicker({selectedColor, onChange}) {
  return (
    <BottomSheetScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {COLORS.map(color => (
        <TouchableOpacity
          onPress={() => onChange?.(color)}
          style={[styles.colorButton, EVENT_COLORS[color]]}
          key={color}>
          {selectedColor === color && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Icon name="check" color="white" size={20} />
            </Animated.View>
          )}
        </TouchableOpacity>
      ))}
    </BottomSheetScrollView>
  );
}

const COLORS = [
  'yellow',
  'pink',
  'red',
  'green',
  'blue',
  'purple',
  'indigo',
  'gray',
  'black',
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
