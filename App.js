import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import SearchScreen from './src/screens/SearchScreen';
import SongsIndexScreen from './src/screens/SongsIndexScreen';
import BindersIndexScreen from './src/screens/BindersIndexScreen';
import SetlistsIndexScreen from './src/screens/SetlistsIndexScreen';
import MembersIndexScreen from './src/screens/MembersIndexScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AccountScreen from './src/screens/AccountScreen';
import SongDetailScreen from './src/screens/SongDetailScreen';
import TabBar from './src/components/TabBar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateSongModal from './src/modals/CreateSongModal';
import CreateBinderModal from './src/modals/CreateBinderModal';
import CreateSetlistModal from './src/modals/CreateSetlistModal';
import PerformSongScreen from './src/screens/PerformSongScreen';
import AddThemeModal from './src/modals/AddThemeModal';
import AddGenreModal from './src/modals/AddGenreModal';
import EditSongDetailsModal from './src/modals/EditSongDetailsModal';
import EditBinderDetailsModal from './src/modals/EditBinderDetailsModal';
import BinderDetailScreen from './src/screens/BinderDetailScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import SetlistDetailScreen from './src/screens/SetlistDetailScreen';
import PerformSetlistScreen from './src/screens/PerformSetlistScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{headerShadowVisible: false, headerTitleAlign: 'center'}}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Songs" component={SongsIndexScreen} />
      <Tab.Screen name="Binders" component={BindersIndexScreen} />
      <Tab.Screen name="Sets" component={SetlistsIndexScreen} />
      <Tab.Screen name="Members" component={MembersIndexScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <BottomSheetModalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Tabbed"
              component={HomeTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Song Detail"
              component={SongDetailScreen}
              options={({route}) => ({
                title: route.params.name,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerBackTitle: '',
              })}
            />
            <Stack.Screen
              name="Binder Detail"
              component={BinderDetailScreen}
              options={({route}) => ({
                title: '',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerBackTitle: '',
              })}
            />
            <Stack.Screen
              name="Setlist Detail"
              component={SetlistDetailScreen}
              options={({route}) => ({
                title: '',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerBackTitle: '',
              })}
            />
            <Stack.Screen
              name="Perform Song"
              component={PerformSongScreen}
              options={({route}) => ({
                title: route.params.name,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerBackTitle: '',
              })}
            />

            <Stack.Screen
              name="Perform Setlist"
              component={PerformSetlistScreen}
              options={({route}) => ({
                title: '',
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerBackTitle: '',
              })}
            />
          </Stack.Group>

          <Stack.Screen
            name="Create Song"
            component={CreateSongModal}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
          />
          <Stack.Screen
            name="Create Binder"
            component={CreateBinderModal}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
          />
          <Stack.Screen
            name="Create Setlist"
            component={CreateSetlistModal}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
          />
          <Stack.Screen
            name="Add Theme"
            component={AddThemeModal}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
          />

          <Stack.Screen
            name="Add Genre"
            component={AddGenreModal}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
          />
          <Stack.Screen
            name="Edit Song Details"
            component={EditSongDetailsModal}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              title: 'Edit Song',
            }}
          />

          <Stack.Screen
            name="Edit Binder Details"
            component={EditBinderDetailsModal}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              title: 'Edit Binder',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
}
