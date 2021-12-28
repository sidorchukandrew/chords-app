import React, {useEffect, useRef} from 'react';

import BottomSheet from './BottomSheet';
import CapoBottomSheetScreen from './CapoBottomSheetScreen';
import KeyOptionsBottomSheetScreen from './KeyOptionsBottomSheetScreen';
import {NavigationContainer} from '@react-navigation/native';
import TransposeBottomSheetScreen from './TransposeBottomSheetScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function KeyOptionsBottomSheet({visible, onDismiss, song}) {
  const bottomSheetRef = useRef();

  useEffect(() => {
    if (visible) bottomSheetRef.current?.present();
  }, [bottomSheetRef, visible]);

  return (
    <BottomSheet
      snapPoints={['30%', '50%', '70%']}
      ref={bottomSheetRef}
      onDismiss={onDismiss}>
      <NavigationContainer independent>
        <Stack.Navigator>
          <Stack.Screen
            name="KeyOptions Options"
            component={KeyOptionsBottomSheetScreen}
            initialParams={song}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="KeyOptions Transpose"
            component={TransposeBottomSheetScreen}
            initialParams={song}
            options={() => ({
              title: 'Transpose',
              headerShadowVisible: false,
              headerTitleAlign: 'left',
            })}
          />
          <Stack.Screen
            name="KeyOptions Capo"
            component={CapoBottomSheetScreen}
            initialParams={song}
            options={() => ({
              title: 'Capo',
              headerShadowVisible: false,
              headerTitleAlign: 'left',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}
