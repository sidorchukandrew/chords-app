import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {selectCurrentTeam} from '../redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from '../hooks/useTheme';

export default function DashboardScreenTitle({onOpenTeamsModal}) {
  const currentTeam = useSelector(selectCurrentTeam);
  const {text, theme} = useTheme();
  const {isConnected} = useNetInfo();

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.button}
        onPress={onOpenTeamsModal}
        disabled={!isConnected}>
        <Text style={[styles.title, text.primary]}>{currentTeam.name}</Text>
        <Icon
          name="chevron-down"
          color={theme === 'light' ? 'black' : 'white'}
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    marginRight: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
