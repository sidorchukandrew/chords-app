import React, {useEffect, useRef} from 'react';
import BottomSheet from './BottomSheet';
import FontBottomSheetScreen from '../screens/FontBottomSheetScreen';
import FontSizeBottomSheetScreen from '../screens/FontSizeBottomSheetScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetlistAdjustmentsBottomSheetScreen from './SetlistAdjustmentsBottomSheetScreen';
import {useTheme} from '../hooks/useTheme';
import ChordColorBottomSheetScreen from './ChordColorBottomSheetScreen';
import HighlightColorBottomSheetScreen from './HighlightColorBottomSheetScreen';

const Stack = createNativeStackNavigator();
export default function SetlistAdjustmentsBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();
  const {surface, text, isDark} = useTheme();
  useEffect(() => {
    if (visible) {
      sheetRef.current?.present();
    }
  }, [visible, sheetRef]);

  return (
    <BottomSheet
      snapPoints={['20%', '80%', '95%']}
      onDismiss={onDismiss}
      ref={sheetRef}
      snapIndex={1}>
      <NavigationContainer independent>
        <Stack.Navigator
          screenOptions={{
            headerStyle: isDark ? surface.secondary : surface.primary,
            headerTitleStyle: text.primary,
          }}>
          <Stack.Screen
            name="SetlistAdjusments Menu"
            component={SetlistAdjustmentsBottomSheetScreen}
            options={() => ({
              title: '',
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            name="SongAdjustments Font"
            component={FontBottomSheetScreen}
            options={() => ({
              title: 'Font',
              headerShadowVisible: false,
              headerTitleAlign: 'left',
            })}
          />

          <Stack.Screen
            name="SongAdjustments FontSize"
            component={FontSizeBottomSheetScreen}
            options={() => ({
              title: 'Size',
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            name="SongAdjustments ChordColor"
            component={ChordColorBottomSheetScreen}
            options={() => ({
              title: 'Chord Color',
              headerShadowVisible: false,
              headerStyle: isDark ? surface.secondary : surface.primary,
              headerTitleStyle: text.primary,
            })}
          />

          <Stack.Screen
            name="SongAdjustments HighlightColor"
            component={HighlightColorBottomSheetScreen}
            options={() => ({
              title: 'Highlight Color',
              headerShadowVisible: false,
              headerStyle: isDark ? surface.secondary : surface.primary,
              headerTitleStyle: text.primary,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}
