import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {START_SESSIONS} from '../utils/auth';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useSessionConnection from '../hooks/useSessionConnection';

export default function CreateSessionButton({setlistId, sessions}) {
  const {isConnected} = useNetInfo();
  const currentMember = useSelector(selectCurrentMember);
  const {blue, text, surface} = useTheme();
  const {isMemberOfActiveSession, isHost, startSession} =
    useSessionConnection(setlistId);

  function canStartSession() {
    const hostingSessionOnOtherDevice = !!sessions?.find?.(
      session => session.user_id === currentMember.id,
    );

    return (
      !isMemberOfActiveSession &&
      !isHost &&
      isConnected &&
      currentMember.can(START_SESSIONS) &&
      !hostingSessionOnOtherDevice
    );
  }

  return (
    <TouchableOpacity
      disabled={!canStartSession()}
      style={[styles.headerButton, surface.tertiary]}
      onPress={() => startSession(setlistId)}>
      <Icon
        name="plus"
        size={22}
        color={canStartSession() ? blue.text.color : text.disabled.color}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 3,
    borderRadius: 50,
    marginLeft: 15,
  },
});
