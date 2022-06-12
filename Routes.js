import React, {useCallback, useEffect, useRef} from 'react';

import SessionConnectionProvider from './src/contexts/SessionConnectionProvider';
import AccountScreen from './src/screens/AccountScreen';
import AddGenreModal from './src/modals/AddGenreModal';
import AddThemeModal from './src/modals/AddThemeModal';
import AppearanceScreen from './src/screens/AppearanceScreen';
import AuthScreen from './src/screens/AuthScreen';
import BinderDetailScreen from './src/screens/BinderDetailScreen';
import BindersIndexScreen from './src/screens/BindersIndexScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ChooseTeamModal from './src/modals/ChooseTeamModal';
import CreateBinderModal from './src/modals/CreateBinderModal';
import CreateSetlistModal from './src/modals/CreateSetlistModal';
import CreateSongModal from './src/modals/CreateSongModal';
import CreateTeamScreen from './src/screens/CreateTeamScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import EditBinderDetailsModal from './src/modals/EditBinderDetailsModal';
import EditProfileScreen from './src/screens/EditProfileScreen';
import EditSetlistDetailsModal from './src/modals/EditSetlistDetailsModal';
import EditSongContentScreen from './src/screens/EditSongContentScreen';
import EditSongDetailsModal from './src/modals/EditSongDetailsModal';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LoginScreen from './src/screens/LoginScreen';
import LoginTeamScreen from './src/screens/LoginTeamScreen';
import MembersIndexScreen from './src/screens/MembersIndexScreen';
import {NavigationContainer} from '@react-navigation/native';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';
import PerformSetlistScreen from './src/screens/PerformSetlistScreen';
import PerformSongScreen from './src/screens/PerformSongScreen';
import SearchScreen from './src/screens/SearchScreen';
import SetlistDetailScreen from './src/screens/SetlistDetailScreen';
import SetlistsIndexScreen from './src/screens/SetlistsIndexScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SongDetailScreen from './src/screens/SongDetailScreen';
import SongsIndexScreen from './src/screens/SongsIndexScreen';
import TabBar from './src/components/TabBar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getAllBinders} from './src/services/bindersService';
import {getAllSetlists} from './src/services/setlistsService';
import {getAllSongs} from './src/services/songsService';
import {reportError} from './src/utils/error';
import {
  loginTeam,
  selectCurrentUser,
  selectIsLoggedIn,
  setCurrentUser,
  setMembership,
  updateInitialLoadComplete,
} from './src/redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import CheckEmailModal from './src/modals/CheckEmailModal';
import CheckEmailForPasswordModal from './src/modals/CheckEmailForPasswordModal';
import PrintSongModal from './src/modals/PrintSongModal';
import {useNetInfo} from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import UsersApi from './src/api/usersApi';
import {
  setMemberInStorage,
  setSubscriptionInStorage,
  setTeamInStorage,
  setUserInStorage,
} from './src/services/authService';
import TeamsApi from './src/api/teamsApi';
import {setSubscription} from './src/redux/slices/subscriptionSlice';
import * as Sentry from '@sentry/react-native';
import {useTheme} from './src/hooks/useTheme';
import {SafeAreaView, StatusBar} from 'react-native';
import CalendarScreen from './src/screens/CalendarScreen';
import OneSignal from 'react-native-onesignal';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const intervalRef = useRef();
  const {isConnected} = useNetInfo();
  const {surface, text, isDark} = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);
    } else {
      StatusBar.setBarStyle('dark-content');
    }
  }, [isDark, isLoggedIn]);

  useEffect(() => {
    async function scheduleRefresh() {
      if (isLoggedIn) {
        dispatch(updateInitialLoadComplete(false));
        await refreshStorage();
        dispatch(updateInitialLoadComplete(true));
        intervalRef.current = setInterval(refreshStorage, 120000);
      }
    }

    scheduleRefresh();

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isLoggedIn, refreshStorage, dispatch]);

  useEffect(() => {
    async function scheduleRefresh() {
      if (isLoggedIn) {
        intervalRef.current = setInterval(refreshUserAndTeam, 920000);
      }
    }

    scheduleRefresh();

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isLoggedIn, refreshUserAndTeam]);

  const refreshStorage = useCallback(async () => {
    try {
      await getAllSongs({refresh: true});
      await getAllBinders({refresh: true});
      await getAllSetlists({refresh: true});
    } catch (error) {
      reportError(error);
    }
  }, []);

  const refreshUserAndTeam = useCallback(async () => {
    try {
      let userResult = await UsersApi.getCurrentUser();
      dispatch(setCurrentUser(userResult.data));
      setUserInStorage(userResult.data);
      Sentry.setUser(userResult.data);

      let teamResult = await TeamsApi.getCurrentTeam();
      dispatch(
        loginTeam({...teamResult.data.team, members: teamResult.data.members}),
      );
      setTeamInStorage({
        ...teamResult.data.team,
        members: teamResult.data.members,
      });

      dispatch(setSubscription(teamResult.data.subscription));
      setSubscriptionInStorage(teamResult.data.subscription);

      let membershipResult = await UsersApi.getTeamMembership();
      dispatch(setMembership({role: membershipResult.data.role}));
      setMemberInStorage({role: membershipResult.data.role});
    } catch (error) {
      reportError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    let timeoutId;
    if (!isConnected && isLoggedIn) {
      timeoutId = setTimeout(() => {
        Snackbar.show({
          text: "No internet connection. Some functionality will not be available until you've reconnected.",
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'CLOSE',
            onPress: () => Snackbar.dismiss(),
            textColor: '#eaeaea',
          },
        });
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [isConnected, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      OneSignal.setExternalUserId(currentUser.uid, results => {});
    } else {
      OneSignal.removeExternalUserId();
    }
  }, [isLoggedIn, currentUser]);

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
        },
        surface.primary,
      ]}>
      <SessionConnectionProvider>
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
                      name="Appearance"
                      component={AppearanceScreen}
                      options={({route}) => ({
                        title: 'Appearance',
                        headerShadowVisible: false,
                        headerTitleAlign: 'center',
                        headerBackTitle: '',
                        headerStyle: surface.primary,
                        headerTitleStyle: text.primary,
                      })}
                    />
                    <Stack.Screen
                      name="Notification Settings"
                      component={NotificationSettingsScreen}
                      options={() => ({
                        title: 'Notification Settings',
                        headerShadowVisible: false,
                        headerTitleAlign: 'center',
                        headerBackTitle: '',
                        headerTitleStyle: text.primary,
                        headerStyle: surface.primary,
                      })}
                    />
                    <Stack.Screen
                      name="Edit Profile"
                      component={EditProfileScreen}
                      options={({route}) => ({
                        title: 'Edit Profile',
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
                      presentation: 'containedModal',
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
                      presentation: 'containedModal',
                    }}
                  />
                  <Stack.Screen
                    name="Edit Song Details"
                    component={EditSongDetailsModal}
                    options={{
                      headerShown: false,
                      presentation: 'containedModal',
                      title: 'Edit Song',
                    }}
                  />

                  <Stack.Screen
                    name="Edit Binder Details"
                    component={EditBinderDetailsModal}
                    options={{
                      headerShown: false,
                      presentation: 'containedModal',
                      title: 'Edit',
                    }}
                  />

                  <Stack.Screen
                    name="Edit Setlist Details"
                    component={EditSetlistDetailsModal}
                    options={{
                      headerShown: false,
                      presentation: 'containedModal',
                      title: 'Edit',
                    }}
                  />
                  <Stack.Screen
                    name="Choose Team"
                    component={ChooseTeamModal}
                    options={{
                      headerShown: false,
                      presentation: 'containedModal',
                    }}
                  />
                  <Stack.Screen
                    name="Print Song"
                    component={PrintSongModal}
                    options={{
                      headerShown: false,
                      presentation: 'containedModal',
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
                    <Stack.Screen
                      name="Login Team"
                      component={LoginTeamScreen}
                    />
                    <Stack.Screen
                      name="Create Team"
                      component={CreateTeamScreen}
                    />
                    <Stack.Screen
                      name="Check Email"
                      component={CheckEmailModal}
                      options={{
                        headerShown: false,
                        presentation: 'containedModal',
                      }}
                    />
                    <Stack.Screen
                      name="Check Email For Password"
                      component={CheckEmailForPasswordModal}
                      options={{
                        headerShown: false,
                        presentation: 'containedModal',
                      }}
                    />
                  </Stack.Group>
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </SessionConnectionProvider>
    </SafeAreaView>
  );
}

function HomeTabs() {
  const {surface, text} = useTheme();
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: surface.primary,
        headerTitleStyle: text.primary,
      }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Songs" component={SongsIndexScreen} />
      <Tab.Screen name="Binders" component={BindersIndexScreen} />
      <Tab.Screen name="Sets" component={SetlistsIndexScreen} />
      <Tab.Screen name="Members" component={MembersIndexScreen} />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
