import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {logout, selectCurrentMember} from '../redux/slices/authSlice';
import {resetAppearancePreferences as resetAppearanceInRedux} from '../redux/slices/appearanceSlice';
import {useDispatch, useSelector} from 'react-redux';

import AccentButton from '../components/AccentButton';
import AccountMenuButton from '../components/AccountMenuButton';
import Container from '../components/Container';
import ProfilePicture from '../components/ProfilePicture';
import React from 'react';
import {clearAllBinders} from '../services/bindersService';
import {clearAllSetlists} from '../services/setlistsService';
import {clearAllSongs} from '../services/songsService';
import {clearAuthStorage} from '../services/authService';
import {hasName} from '../utils/member';
import {resetAppearancePreferences} from '../services/appearanceService';
import {useTheme} from '../hooks/useTheme';

export default function AccountScreen({navigation}) {
  const dispatch = useDispatch();
  const {text, surface} = useTheme();
  const currentMember = useSelector(selectCurrentMember);

  function handleLogout() {
    clearAuthStorage();
    clearAllSongs();
    clearAllSetlists();
    clearAllBinders();
    resetAppearancePreferences();
    dispatch(logout());
    dispatch(resetAppearanceInRedux());
  }

  return (
    <>
      <ScrollView style={[styles.screen, surface.primary]}>
        <Container size="md">
          <View style={styles.profileInfo}>
            <ProfilePicture
              url={currentMember?.image_url}
              size="xl"
              member={currentMember}
              style={styles.profilePicture}
            />
            {hasName(currentMember) && (
              <Text style={[styles.name, text.primary]}>
                {currentMember.first_name} {currentMember.last_name}
              </Text>
            )}
            <Text style={[styles.email, text.secondary]}>
              {currentMember.email}
            </Text>
          </View>
          <View style={styles.menu}>
            <AccountMenuButton
              underlined
              icon="account-circle"
              text="Profile"
              iconBackgroundColor="#f87171"
              onPress={() => navigation.push('Edit Profile')}
            />
            <AccountMenuButton
              underlined
              icon="bell"
              iconBackgroundColor="#fb923c"
              text="Notifications"
              onPress={() => navigation.push('Notification Settings')}
            />
            <AccountMenuButton
              icon="palette"
              text="Appearance"
              iconBackgroundColor="#a78bfa"
              onPress={() => navigation.push('Appearance')}
            />
          </View>
        </Container>
      </ScrollView>
      <AccentButton
        onPress={handleLogout}
        textStyle={{color: '#ef4444'}}
        style={{borderRadius: 0}}>
        Log out
      </AccentButton>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    paddingVertical: 30,
    flex: 1,
  },
  container: {
    justifyContent: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
  email: {
    color: '#606060',
    fontSize: 16,
    fontWeight: '600',
  },
});
