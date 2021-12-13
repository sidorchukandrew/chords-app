import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import AdjustmentsBottomSheetScreen from './AdjustmentsBottomSheetScreen';
import BottomSheet from './BottomSheet';

const Stack = createNativeStackNavigator();
export default function SongAdjustmentsBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();
  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheet
      snapPoints={['50%', '80%']}
      onDismiss={onDismiss}
      ref={sheetRef}>
      <NavigationContainer independent>
        <Stack.Navigator>
          <Stack.Screen
            name="SongAdjusments Menu"
            component={AdjustmentsBottomSheetScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}
