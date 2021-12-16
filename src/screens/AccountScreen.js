import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import ProfilePicture from '../components/ProfilePicture';
import {
  logout,
  selectCurrentMember,
  selectCurrentUser,
} from '../redux/slices/authSlice';

export default function Account() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectCurrentMember);
  console.log(currentMember);

  function handleLogout() {
    dispatch(logout());
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
