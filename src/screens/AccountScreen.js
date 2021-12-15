import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from '../components/Button';
import {logout} from '../redux/slices/authSlice';

export default function Account() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <View>
      <Text>Account</Text>
      <Button onPress={handleLogout}>Log out</Button>
    </View>
  );
}

const styles = StyleSheet.create({});
