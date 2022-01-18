import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ProfilePicture from './ProfilePicture';
import React from 'react';
import {selectCurrentUser} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';

export default function DashboardScreenProfilePicture() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <TouchableOpacity style={styles.button}>
      <ProfilePicture
        url={currentUser?.image_url}
        size="md"
        member={currentUser}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
  },
});
