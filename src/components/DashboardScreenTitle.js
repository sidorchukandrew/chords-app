import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {selectCurrentTeam} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';

export default function DashboardScreenTitle({onOpenTeamsModal}) {
  const currentTeam = useSelector(selectCurrentTeam);
  const {isConnected} = useNetInfo();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onOpenTeamsModal}
        disabled={!isConnected}>
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
    marginTop: 10,
  },
});
