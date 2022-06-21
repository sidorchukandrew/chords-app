import {StyleSheet, View, Text} from 'react-native';
import React, {useLayoutEffect, useMemo} from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import {ScrollView} from 'react-native-gesture-handler';
import SessionCard from '../components/SessionCard';
import useSessionConnection from '../hooks/useSessionConnection';
import Snackbar from 'react-native-snackbar';
import {useTheme} from '../hooks/useTheme';
import ItemSeparator from '../components/ItemSeparator';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import CreateSessionButton from '../components/CreateSessionButton';
import useSessions from '../hooks/useSessions';
import {useSelector} from 'react-redux';
import {selectCurrentMember} from '../redux/slices/authSlice';

export default function SessionsBottomSheetScreen({navigation, route}) {
  const {
    data: sessions,
    loading,
    resolved,
    updateData,
  } = useSessions(route.params.setlistId);
  const {
    joinSessionAsMember,
    activeSession,
    hostedSession,
    leaveSessionAsMember,
    endSession,
  } = useSessionConnection(route.params.id);
  const currentMember = useSelector(selectCurrentMember);

  const nonActiveSessions = useMemo(
    () =>
      sessions?.filter(
        s =>
          s.id !== activeSession?.id &&
          s.id !== hostedSession?.id &&
          hostedSession?.user_id !== currentMember.id,
      ),
    [sessions, activeSession, hostedSession, currentMember],
  );
  const {text} = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CreateSessionButton
          setlistId={route.params.setlistId}
          sessions={sessions}
        />
      ),
    });
  }, [navigation, route.params.setlistId, sessions]);

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

  function handleEndSession(session) {
    endSession(session);
    Snackbar.show({
      duration: Snackbar.LENGTH_SHORT,
      text: 'Session has ended!',
    });

    let updatedSessions = sessions.filter(
      sessionInList => sessionInList.id !== session.id,
    );
    updateData(updatedSessions);
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={[text.primary, styles.sectionTitleText]}>Connected</Text>
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          {activeSession && (
            <SessionCard
              session={activeSession}
              buttonText="Leave"
              connected={true}
              onButtonPress={handleLeaveSession}
            />
          )}
          {hostedSession && (
            <SessionCard
              session={hostedSession}
              buttonText="End session"
              connected={true}
              onButtonPress={handleEndSession}
            />
          )}
        </Animated.View>
        {!hostedSession && !activeSession && (
          <Text style={[styles.noActiveText, text.secondary]}>
            No active connections
          </Text>
        )}
        <ItemSeparator style={styles.separatorSpacing} />
        <Text style={[text.primary, styles.sectionTitleText]}>
          Other sessions
        </Text>
        {loading && <LoadingIndicator />}
        {resolved &&
          (nonActiveSessions?.length > 0 ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              {nonActiveSessions.map(session => (
                <SessionCard
                  session={session}
                  key={session.id}
                  onButtonPress={handleJoinSession}
                  buttonText="Join session"
                  connected={false}
                />
              ))}
            </Animated.View>
          ) : (
            <NoDataMessage message="No available sessions" />
          ))}
      </ScrollView>
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
  noActiveText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});
