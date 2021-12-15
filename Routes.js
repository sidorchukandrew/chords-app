import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LoginTeamScreen from './src/screens/LoginTeamScreen';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from './src/redux/slices/authSlice';
import CreateTeamScreen from './src/screens/CreateTeamScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SearchScreen from './src/screens/SearchScreen';
import SongsIndexScreen from './src/screens/SongsIndexScreen';
import BindersIndexScreen from './src/screens/BindersIndexScreen';
import SetlistsIndexScreen from './src/screens/SetlistsIndexScreen';
import MembersIndexScreen from './src/screens/MembersIndexScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AccountScreen from './src/screens/AccountScreen';
import SongDetailScreen from './src/screens/SongDetailScreen';
import TabBar from './src/components/TabBar';

import CreateSongModal from './src/modals/CreateSongModal';
import CreateBinderModal from './src/modals/CreateBinderModal';
import CreateSetlistModal from './src/modals/CreateSetlistModal';
import PerformSongScreen from './src/screens/PerformSongScreen';
import AddThemeModal from './src/modals/AddThemeModal';
import AddGenreModal from './src/modals/AddGenreModal';
import EditSongDetailsModal from './src/modals/EditSongDetailsModal';
import EditBinderDetailsModal from './src/modals/EditBinderDetailsModal';
import BinderDetailScreen from './src/screens/BinderDetailScreen';

import SetlistDetailScreen from './src/screens/SetlistDetailScreen';
import PerformSetlistScreen from './src/screens/PerformSetlistScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <BottomSheetModalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              <Stack.Group
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Auth" component={AuthScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                <Stack.Screen
                  name="Forgot Password"
                  component={ForgotPasswordScreen}
                />
                <Stack.Screen name="Login Team" component={LoginTeamScreen} />
                <Stack.Screen name="Create Team" component={CreateTeamScreen} />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
}

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
