import {StyleSheet, Text, View} from 'react-native';
import {
  logout,
  selectCurrentMember,
  selectCurrentUser,
} from '../redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../components/Button';
import ProfilePicture from '../components/ProfilePicture';
import React from 'react';
import {clearAllBinders} from '../services/bindersService';
import {clearAllSetlists} from '../services/setlistsService';
import {clearAllSongs} from '../services/songsService';
import {clearAuthStorage} from '../services/authService';

export default function AccountScreen() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectCurrentMember);
  console.log(currentMember);

  function handleLogout() {
    dispatch(logout());
    clearAuthStorage();
    clearAllSongs();
    clearAllSetlists();
    clearAllBinders();
  }

  return (
    <View>
      <Text>Account</Text>
      <ProfilePicture url={currentUser?.image_url} size="lg" />
      <Button onPress={handleLogout}>Log out</Button>
    </View>
  );
}

const styles = StyleSheet.create({});
