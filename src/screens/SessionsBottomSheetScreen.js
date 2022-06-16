import {StyleSheet, View, Text} from 'react-native';
import React, {useMemo} from 'react';
import useActiveSessions from '../hooks/useActiveSessions';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import {ScrollView} from 'react-native-gesture-handler';
import SessionCard from '../components/SessionCard';
import useSessionConnection from '../hooks/useSessionConnection';
import Snackbar from 'react-native-snackbar';
import {useTheme} from '../hooks/useTheme';
import ItemSeparator from '../components/ItemSeparator';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export default function SessionsBottomSheetScreen({route}) {
  const {
    data: sessions,
    loading,
    empty,
    resolved,
  } = useActiveSessions(route.params.setlistId);
  const {joinSessionAsMember, activeSessionDetails, leaveSessionAsMember} =
    useSessionConnection(route.params.id);
  const nonActiveSessions = useMemo(
    () =>
      sessions?.filter(s => s.id !== activeSessionDetails.activeSession?.id),
    [sessions, activeSessionDetails],
  );
  const {text} = useTheme();

  function handleJoinSession(session) {
    joinSessionAsMember(session);
    Snackbar.show({
      duration: Snackbar.LENGTH_SHORT,
      text: 'Connected to session!',
    });
  }

  function handleLeaveSession(session) {
    leaveSessionAsMember(session);
    Snackbar.show({
      duration: Snackbar.LENGTH_SHORT,
      text: 'Successfully left session!',
    });
  }

  return (
    <View style={styles.screen}>
      {empty && <NoDataMessage message="No available sessions" />}
      {loading && <LoadingIndicator />}
      {resolved && (
        <ScrollView contentContainerStyle={styles.list}>
          {activeSessionDetails.activeSession && (
            <Animated.View entering={FadeIn}>
              <View>
                <Text style={[text.primary, styles.sectionTitleText]}>
                  Connected
                </Text>
                <SessionCard
                  session={activeSessionDetails.activeSession}
                  connected={true}
                  onLeaveSession={handleLeaveSession}
                />
              </View>
              <ItemSeparator style={styles.separatorSpacing} />
              <Text style={[text.primary, styles.sectionTitleText]}>
                Other sessions
              </Text>
            </Animated.View>
          )}
          {nonActiveSessions.length > 0 && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              {nonActiveSessions.map(session => (
                <SessionCard
                  session={session}
                  key={session.id}
                  onJoinSession={handleJoinSession}
                  connected={false}
                />
              ))}
            </Animated.View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  separatorSpacing: {
    marginVertical: 20,
  },
  sectionTitleText: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
});
