import React, {useRef} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import BottomSheet from './BottomSheet';
import ColorSwatchOption from './ColorSwatchOption';

export default function BinderColorSwatchesBottomSheet({
  visible,
  onDismiss,
  color,
  onChange,
}) {
  const {text} = useTheme();
  const sheetRef = useRef();
  const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'indigo',
    'pink',
    'gray',
  ];

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheet
      dynamicHeight
      snapPoints={['CONTENT_HEIGHT']}
      ref={sheetRef}
      onDismiss={onDismiss}>
      <View style={styles.container}>
        <Text style={[styles.title, text.primary]}>Choose a color</Text>
        <View style={styles.swatchesContainer}>
          <ScrollView horizontal>
            <ColorSwatchOption
              color="None"
              onPress={() => onChange?.('')}
              selected={!color || color === ''}
            />
            {colors.map(colorOption => (
              <ColorSwatchOption
                key={colorOption}
                color={colorOption}
                selected={colorOption === color}
                onPress={() => onChange?.(colorOption)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'left',
  },
  swatchesContainer: {
    height: 60,
  },
});
