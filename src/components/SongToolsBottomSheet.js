import React, {useEffect, useRef} from 'react';

import BottomSheet from './BottomSheet';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../hooks/useTheme';
import SongToolsBottomSheetScreen from '../screens/SongToolsBottomSheetScreen';
import AutoscrollBottomSheetScreen from '../screens/AutoscrollBottomSheetScreen';
import MetronomeBottomSheetScreen from '../screens/MetronomeBottomSheetScreen';

const Stack = createNativeStackNavigator();
export default function SongToolsBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();
  const {isDark, surface, text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheet
      snapPoints={['20%', '80%']}
      onDismiss={onDismiss}
      ref={sheetRef}
      snapIndex={1}>
      <NavigationContainer
        independent
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: isDark
              ? surface.secondary.backgroundColor
              : surface.primary.backgroundColor,
          },
        }}>
        <Stack.Navigator>
          <Stack.Screen
            name="SongTools Menu"
            component={SongToolsBottomSheetScreen}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="Autoscroll"
            component={AutoscrollBottomSheetScreen}
            options={() => ({
              title: 'Font',
              headerShadowVisible: false,
              headerTitleAlign: 'left',
              headerStyle: isDark ? surface.secondary : surface.primary,
              headerTitleStyle: text.primary,
            })}
          />
          <Stack.Screen
            name="Metronome"
            component={MetronomeBottomSheetScreen}
            options={() => ({
              title: '',
              headerShadowVisible: false,
              headerTitleAlign: 'left',
              headerStyle: isDark ? surface.secondary : surface.primary,
              headerTitleStyle: text.primary,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}
