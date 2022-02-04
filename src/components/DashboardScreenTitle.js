import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {selectCurrentTeam} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';

export default function DashboardScreenTitle({onOpenTeamsModal}) {
  const currentTeam = useSelector(selectCurrentTeam);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onOpenTeamsModal}>
        <Text style={styles.title}>{currentTeam.name}</Text>
        <Icon name="chevron-down" color="black" size={18} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontWeight: '600',
    marginRight: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
