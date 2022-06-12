import {StyleSheet, View} from 'react-native';
import React from 'react';
import useActiveSessions from '../hooks/useActiveSessions';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMessage from '../components/NoDataMessage';
import {ScrollView} from 'react-native-gesture-handler';
import SessionCard from '../components/SessionCard';
import useSessionConnection from '../hooks/useSessionConnection';

export default function SessionsBottomSheetScreen({route}) {
  const {
    data: sessions,
    loading,
    empty,
    errored,
    resolved,
  } = useActiveSessions(route.params.setlistId);
  const sessionConnection = useSessionConnection(route.params.id);

  return (
    <View style={styles.screen}>
      {loading && <LoadingIndicator />}
      {empty && <NoDataMessage message="No available sessions" />}
      {resolved && (
        <ScrollView>
          {sessions.map(session => (
            <SessionCard session={session} key={session.id} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
  },
});
