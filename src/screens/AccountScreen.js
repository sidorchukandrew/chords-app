import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  logout,
  selectCurrentMember,
  selectCurrentUser,
} from '../redux/slices/authSlice';
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

export default function AccountScreen({navigation}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectCurrentMember);

  function handleLogout() {
    dispatch(logout());
    clearAuthStorage();
    clearAllSongs();
    clearAllSetlists();
    clearAllBinders();
  }

  return (
    <>
      <ScrollView style={styles.screen}>
        <Container size="md">
          <View style={styles.profileInfo}>
            <ProfilePicture
              url={currentUser?.image_url}
              size="xl"
              member={currentMember}
              style={styles.profilePicture}
            />
            {hasName(currentMember) && (
              <Text style={styles.name}>
                {currentMember.first_name} {currentMember.last_name}
              </Text>
            )}
            <Text style={styles.email}>{currentMember.email}</Text>
          </View>
          <View style={styles.menu}>
            <AccountMenuButton
              icon="account-circle-outline"
              text="Profile"
              onPress={() => navigation.push('Edit Profile')}
            />
            <AccountMenuButton
              icon="bell-outline"
              text="Notifications"
              onPress={() => navigation.push('Notification Settings')}
            />
            <AccountMenuButton
              icon="palette-outline"
              text="Appearance"
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
    color: 'black',
    fontSize: 22,
  },
  email: {
    color: '#505050',
    fontSize: 16,
  },
  menu: {
    borderTopColor: '#eaeaea',
    borderTopWidth: 1,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
});
