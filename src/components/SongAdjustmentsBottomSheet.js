import React, {useEffect, useRef} from 'react';

import AdjustmentsBottomSheetScreen from './AdjustmentsBottomSheetScreen';
import BottomSheet from './BottomSheet';
import FontBottomSheetScreen from '../screens/FontBottomSheetScreen';
import FontSizeBottomSheetScreen from '../screens/FontSizeBottomSheetScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function SongAdjustmentsBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();
  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheet snapPoints={['80%']} onDismiss={onDismiss} ref={sheetRef}>
      <NavigationContainer independent>
        <Stack.Navigator>
          <Stack.Screen
            name="SongAdjusments Menu"
            component={AdjustmentsBottomSheetScreen}
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
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}
