import React, {useEffect, useRef} from 'react';

import BottomSheet from './BottomSheet';
import FontBottomSheetScreen from '../screens/FontBottomSheetScreen';
import FontSizeBottomSheetScreen from '../screens/FontSizeBottomSheetScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetlistAdjustmentsBottomSheetScreen from './SetlistAdjustmentsBottomSheetScreen';

const Stack = createNativeStackNavigator();
export default function SetlistAdjustmentsBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();
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
            name="SetlistAdjusments Menu"
            component={SetlistAdjustmentsBottomSheetScreen}
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
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}
