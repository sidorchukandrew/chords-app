import React, {useEffect, useRef} from 'react';

import AdjustmentsBottomSheetScreen from './AdjustmentsBottomSheetScreen';
import BottomSheet from './BottomSheet';
import FontBottomSheetScreen from '../screens/FontBottomSheetScreen';
import FontSizeBottomSheetScreen from '../screens/FontSizeBottomSheetScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../hooks/useTheme';

const Stack = createNativeStackNavigator();
export default function SongAdjustmentsBottomSheet({visible, onDismiss}) {
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
      <NavigationContainer independent>
        <Stack.Navigator>
          <Stack.Screen
            name="SongAdjusments Menu"
            component={AdjustmentsBottomSheetScreen}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="SongAdjustments Font"
            component={FontBottomSheetScreen}
            options={() => ({
              title: 'Font',
              headerShadowVisible: false,
              headerTitleAlign: 'left',
              headerStyle: isDark ? surface.secondary : surface.primary,
              headerTitleStyle: text.primary,
            })}
          />

          <Stack.Screen
            name="SongAdjustments FontSize"
            component={FontSizeBottomSheetScreen}
            options={() => ({
              title: 'Size',
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
