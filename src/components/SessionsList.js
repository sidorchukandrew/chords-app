import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';
import useSessionConnection from '../hooks/useSessionConnection';
import useSessions from '../hooks/useSessions';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {findSessionCurrentUserIsHosting} from '../utils/sessions';
import Divider from './Divider';
import LoadingIndicator from './LoadingIndicator';
import NoDataMessage from './NoDataMessage';
import Section from './Section';
import SessionCard from './SessionCard';

export default function SessionsList({setlist, onJoinSession}) {
  const {
    data: sessions,
    resolved,
    loading,
    updateData,
  } = useSessions(setlist.id);

  const {endSession} = useSessionConnection(setlist.id);
  const currentMember = useSelector(selectCurrentMember);
  const currentUserSession = useMemo(
    () => findSessionCurrentUserIsHosting(currentMember, sessions),
    [currentMember, sessions],
  );
  const otherSessions = useMemo(
    () => sessions.filter(s => s.id !== currentUserSession?.id) || [],
    [currentUserSession, sessions],
  );
  const empty = !currentUserSession && !otherSessions?.length > 0;

  function handleEndSession(session) {
    endSession(session);
    Snackbar.show({
      duration: Snackbar.LENGTH_SHORT,
      text: 'Session has ended!',
    });

    let updatedSessions = sessions?.filter(
      sessionInList => sessionInList.id !== session.id,
    );
    updateData(updatedSessions);
  }

  return (
    <View style={styles.container}>
      <Divider size="lg" />
      <Section title="Sessions">
        {loading && <LoadingIndicator />}
        {resolved && !empty && (
          <ScrollView horizontal={true}>
            {currentUserSession && (
              <SessionCard
                session={currentUserSession}
                disabled={setlist.songs?.length === 0}
                onButtonPress={handleEndSession}
                buttonText="End session"
                connected={true}
              />
            )}
            {otherSessions?.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                disabled={setlist.songs?.length === 0}
                onButtonPress={onJoinSession}
                buttonText="Join session"
                connected={false}
              />
            ))}
          </ScrollView>
        )}
        {resolved && empty && <NoDataMessage message="No available sessions" />}
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
