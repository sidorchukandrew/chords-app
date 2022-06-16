import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import useActiveSessions from '../hooks/useActiveSessions';
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
    empty,
  } = useActiveSessions(setlist.id);

  return (
    <View style={styles.container}>
      <Divider size="lg" />
      <Section title="Sessions">
        {loading && <LoadingIndicator />}
        {empty && (
          <NoDataMessage showAddButton={false} message="No active sessions" />
        )}
        {resolved && (
          <ScrollView horizontal={true}>
            {sessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                disabled={setlist.songs?.length === 0}
                onJoinSession={onJoinSession}
              />
            ))}
          </ScrollView>
        )}
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
