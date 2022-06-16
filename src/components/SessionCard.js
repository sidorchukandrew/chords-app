import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../hooks/useTheme';
import ProfilePicture from './ProfilePicture';
import {getNameOrEmail} from '../utils/member';
import Button from './Button';

export default function SessionCard({
  session,
  onJoinSession,
  connected,
  onLeaveSession,
}) {
  const {surface, text, red} = useTheme();

  return (
    <View style={[styles.card, surface.tertiary]}>
      <View style={styles.topContainer}>
        <View style={styles.nameImageContainer}>
          <ProfilePicture
            url={session.user?.image_url}
            size="md"
            member={session.user}
          />
          <View style={styles.hostContainer}>
            <Text style={text.primary}>{getNameOrEmail(session.user)}</Text>
            <Text style={[styles.hostLabelText, text.secondary]}>HOST</Text>
          </View>
        </View>
      </View>
      {connected ? (
        <Button
          full={false}
          style={[styles.button, red.background]}
          onPress={() => onLeaveSession?.(session)}>
          Leave
        </Button>
      ) : (
        <Button style={styles.button} onPress={() => onJoinSession(session)}>
          Join session
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 10,
  },
  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  hostLabelText: {
    fontWeight: '700',
    fontSize: 11,
  },
  hostContainer: {
    marginLeft: 10,
  },
  button: {
    height: 30,
  },
});
