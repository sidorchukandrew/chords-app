import React, {useRef, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import KeyOptionsBottomSheetScreen from './KeyOptionsBottomSheetScreen';
import TransposeBottomSheetScreen from './TransposeBottomSheetScreen';
import CapoBottomSheetScreen from './CapoBottomSheetScreen';
import BottomSheet from './BottomSheet';

const Stack = createNativeStackNavigator();
export default function KeyOptionsBottomSheet({visible, onDismiss}) {
  const bottomSheetRef = useRef();

  useEffect(() => {
    if (visible) bottomSheetRef.current?.present();
  }, [bottomSheetRef, visible]);

  return (
    <BottomSheet
      snapPoints={['30%', '50%']}
      ref={bottomSheetRef}
      onDismiss={onDismiss}>
      <NavigationContainer independent>
        <Stack.Navigator>
          <Stack.Screen
            name="KeyOptions Options"
            component={KeyOptionsBottomSheetScreen}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="KeyOptions Transpose"
            component={TransposeBottomSheetScreen}
            options={() => ({
              title: '',
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            name="KeyOptions Capo"
            component={CapoBottomSheetScreen}
            options={() => ({
              title: '',
              headerShadowVisible: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}
