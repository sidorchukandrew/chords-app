import {StyleSheet, TextInput, useWindowDimensions} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {
  LongPressGestureHandler,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import NoteOptionsBottomSheet from './NoteOptionsBottomSheet';
import NoteColorsBottomSheet from './NoteColorsBottomSheet';
import {reportError} from '../utils/error';
import {deleteNoteFromSong, updateNoteOnSong} from '../services/notesService';
import _ from 'lodash';

export default function Note({note, onDeleted, onChanged, song}) {
  const {width} = useWindowDimensions();

  const pressed = useSharedValue(false);
  const x = useSharedValue(clamp());
  const y = useSharedValue(note.y);
  const [showNoteOptionsSheet, setShowNoteOptionsSheet] = useState(false);
  const [showColorsSheet, setShowColorsSheet] = useState(false);

  useEffect(() => {
    x.value = clamp();
  }, [width]);

  function clamp() {
    let noteWidthPlusPadding = 200 + 70;
    if (note.x > width) {
      return width - noteWidthPlusPadding;
    } else {
      return note.x;
    }
  }

  function handleCoordinatesChange(newX, newY) {
    try {
      console.log('Saving coordinates');
      onChanged({x: newX, y: newY});
      updateNoteOnSong(note.id, song.id, {x: newX, y: newY});
    } catch (error) {
      reportError();
    }
  }

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      runOnJS(handleCoordinatesChange)(x.value, y.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {scale: withSpring(pressed.value ? 1.1 : 1)},
      ],
    };
  });

  function handleLongPress({nativeEvent}) {
    if (nativeEvent.state === State.ACTIVE) {
      setShowNoteOptionsSheet(true);
    }
  }

  function getColor() {
    return {
      backgroundColor: NOTE_COLORS.find(
        colorOption => colorOption.color === note.color,
      ).hex,
    };
  }

  async function handleColorChange(newColor) {
    onChanged({color: newColor});

    try {
      await updateNoteOnSong(note.id, song.id, {color: newColor});
    } catch (error) {
      reportError(error);
    }
  }

  // eslint-disable-next-line
  const debounce = useCallback(
    _.debounce(
      async updates => {
        try {
          await updateNoteOnSong(note.id, song.id, updates);
        } catch (error) {
          reportError(error);
        }
      },
      [1200],
    ),
    [],
  );

  function handleContentChange(newContent) {
    try {
      onChanged({content: newContent});
      debounce({content: newContent});
    } catch (error) {
      reportError();
    }
  }

  async function handleDelete() {
    try {
      onDeleted(note.id);
      deleteNoteFromSong(note.id, song.id);
    } catch (error) {
      reportError(error);
    }
  }

  return (
    <>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={[styles.noteContainer, animatedStyle, getColor()]}>
          <LongPressGestureHandler onHandlerStateChange={handleLongPress}>
            <Animated.View style={{padding: 10}}>
              <TextInput
                value={note.content}
                onChangeText={handleContentChange}
                style={styles.input}
                multiline
              />
            </Animated.View>
          </LongPressGestureHandler>
        </Animated.View>
      </PanGestureHandler>
      <NoteOptionsBottomSheet
        visible={showNoteOptionsSheet}
        onDismiss={() => setShowNoteOptionsSheet(false)}
        note={note}
        onChangeColor={() => setShowColorsSheet(true)}
        onDelete={handleDelete}
      />
      <NoteColorsBottomSheet
        visible={showColorsSheet}
        onDismiss={() => setShowColorsSheet(false)}
        selectedColor={note.color}
        onChange={handleColorChange}
      />
    </>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    width: 200,
    height: 170,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 16,
    backgroundColor: '#FEEF86',
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
  },
});

export const NOTE_COLORS = [
  {color: 'yellow', hex: '#fde689'},
  {color: 'green', hex: '#a7f3cf'},
  {color: 'pink', hex: '#fbd0e8'},
  {color: 'blue', hex: '#bfdbfe'},
];
