import React, {useRef} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import BottomSheet from './BottomSheet';
import ColorSwatchOption from './ColorSwatchOption';
import {NOTE_COLORS} from './Note';

export default function NoteColorsBottomSheet({
  visible,
  onDismiss,
  selectedColor,
  onChange,
}) {
  const sheetRef = useRef();
  const {text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheet
      snapPoints={['CONTENT_HEIGHT']}
      dynamicHeight
      ref={sheetRef}
      onDismiss={onDismiss}>
      <View style={styles.container}>
        <Text style={[styles.title, text.primary]}>Choose a color</Text>
        <View style={styles.swatchesContainer}>
          <ScrollView horizontal>
            {NOTE_COLORS.map(({color, hex}) => (
              <ColorSwatchOption
                key={color}
                hexValue={hex}
                color={color}
                selected={selectedColor === color}
                onPress={() => onChange?.(color)}
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
