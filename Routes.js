import AccountScreen from './src/screens/AccountScreen';
import AddGenreModal from './src/modals/AddGenreModal';
import AddThemeModal from './src/modals/AddThemeModal';
import AuthScreen from './src/screens/AuthScreen';
import BinderDetailScreen from './src/screens/BinderDetailScreen';
import BindersIndexScreen from './src/screens/BindersIndexScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import CreateBinderModal from './src/modals/CreateBinderModal';
import CreateSetlistModal from './src/modals/CreateSetlistModal';
import CreateSongModal from './src/modals/CreateSongModal';
import CreateTeamScreen from './src/screens/CreateTeamScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import EditBinderDetailsModal from './src/modals/EditBinderDetailsModal';
import EditSetlistDetailsModal from './src/modals/EditSetlistDetailsModal';
import EditSongContentScreen from './src/screens/EditSongContentScreen';
import EditSongDetailsModal from './src/modals/EditSongDetailsModal';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LoginScreen from './src/screens/LoginScreen';
import LoginTeamScreen from './src/screens/LoginTeamScreen';
import MembersIndexScreen from './src/screens/MembersIndexScreen';
import {NavigationContainer} from '@react-navigation/native';
import PerformSetlistScreen from './src/screens/PerformSetlistScreen';
import PerformSongScreen from './src/screens/PerformSongScreen';
import React from 'react';
import SearchScreen from './src/screens/SearchScreen';
import SetlistDetailScreen from './src/screens/SetlistDetailScreen';
import SetlistsIndexScreen from './src/screens/SetlistsIndexScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SongDetailScreen from './src/screens/SongDetailScreen';
import SongsIndexScreen from './src/screens/SongsIndexScreen';
import TabBar from './src/components/TabBar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {selectIsLoggedIn} from './src/redux/slices/authSlice';
import {useSelector} from 'react-redux';

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
                  name="Edit Song Content"
                  component={EditSongContentScreen}
                  options={({route}) => ({
                    title: 'Edit',
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
                  presentation: 'containedModal',
                }}
              />
              <Stack.Screen
                name="Create Binder"
                component={CreateBinderModal}
                options={{
                  headerShown: false,
                  presentation: 'containedModal',
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
                  presentation: 'containedModal',
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
                  title: 'Edit',
                }}
              />

              <Stack.Screen
                name="Edit Setlist Details"
                component={EditSetlistDetailsModal}
                options={{
                  headerShown: false,
                  presentation: 'fullScreenModal',
                  title: 'Edit',
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
