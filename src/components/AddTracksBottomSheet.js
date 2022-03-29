import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomSheet from './BottomSheet';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';
import AddTracksBottomSheetScreen from '../screens/AddTracksBottomSheetScreen';
import AddAppleMusicTrackScreen from '../screens/AddAppleMusicTrackScreen';

const Stack = createNativeStackNavigator();
export default function AddTracksBottomSheet({visible, onDismiss}) {
  const sheetRef = useRef();
  const {isDark, surface} = useTheme();
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
            background: isDark ? surface.secondary : surface.primary,
          },
        }}>
        <Stack.Navigator>
          <Stack.Screen
            component={AddTracksBottomSheetScreen}
            options={{headerShown: false}}
            name="Add Tracks"
          />
          <Stack.Screen
            component={AddAppleMusicTrackScreen}
            options={{headerShown: false}}
            name="Add Apple Music Tracks"
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});
