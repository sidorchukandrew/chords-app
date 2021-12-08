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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Tabbed"
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Song Detail" component={SongDetailScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
