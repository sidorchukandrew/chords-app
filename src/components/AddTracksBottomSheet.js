import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomSheet from './BottomSheet';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';
import AddTracksBottomSheetScreen from '../screens/AddTracksBottomSheetScreen';
import AddAppleMusicTrackScreen from '../screens/AddAppleMusicTrackScreen';
import AddSpotifyTrackScreen from '../screens/AddSpotifyTrackScreen';
import AddYouTubeTrackScreen from '../screens/AddYouTubeTrackScreen';

const Stack = createNativeStackNavigator();
export const CurrentSongContext = React.createContext();

export default function AddTracksBottomSheet({visible, onDismiss, song}) {
  const sheetRef = useRef();
  const {isDark, surface, text} = useTheme();

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  return (
    <BottomSheet
      snapPoints={['20%', '94%']}
      onDismiss={onDismiss}
      ref={sheetRef}
      snapIndex={1}>
      <CurrentSongContext.Provider value={song}>
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
              options={{
                title: 'Apple Music',
                headerShadowVisible: false,
                headerTitleAlign: 'left',
                headerStyle: isDark ? surface.secondary : surface.primary,
                headerTitleStyle: text.primary,
              }}
              name="Add Apple Music Tracks"
            />
            <Stack.Screen
              component={AddSpotifyTrackScreen}
              options={{
                title: 'Spotify',
                headerShadowVisible: false,
                headerTitleAlign: 'left',
                headerStyle: isDark ? surface.secondary : surface.primary,
                headerTitleStyle: text.primary,
              }}
              name="Add Spotify Tracks"
            />
            <Stack.Screen
              component={AddYouTubeTrackScreen}
              options={{
                title: 'YouTube',
                headerShadowVisible: false,
                headerTitleAlign: 'left',
                headerStyle: isDark ? surface.secondary : surface.primary,
                headerTitleStyle: text.primary,
              }}
              name="Add YouTube Tracks"
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CurrentSongContext.Provider>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});
