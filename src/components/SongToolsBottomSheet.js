import React, {useEffect, useRef} from 'react';

import BottomSheet from './BottomSheet';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../hooks/useTheme';
import SongToolsBottomSheetScreen from '../screens/SongToolsBottomSheetScreen';
import AutoscrollBottomSheetScreen from '../screens/AutoscrollBottomSheetScreen';
import MetronomeBottomSheetScreen from '../screens/MetronomeBottomSheetScreen';
import SessionsBottomSheetScreen from '../screens/SessionsBottomSheetScreen';
import SessionConnectionProvider from '../contexts/SessionConnectionProvider';

const Stack = createNativeStackNavigator();
export default function SongToolsBottomSheet({
  visible,
  onDismiss,
  sessionsEnabled,
  setlistId,
}) {
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
      <SessionConnectionProvider>
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
              initialParams={{sessionsEnabled}}
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
            {sessionsEnabled && (
              <Stack.Screen
                name="Sessions"
                component={SessionsBottomSheetScreen}
                options={() => ({
                  title: 'Sessions',
                  headerShadowVisible: false,
                  headerTitleAlign: 'center',
                  headerStyle: isDark ? surface.secondary : surface.primary,
                  headerTitleStyle: text.primary,
                })}
                initialParams={{setlistId}}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SessionConnectionProvider>
    </BottomSheet>
  );
}
