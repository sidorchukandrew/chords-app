import {useEffect, useContext, useState} from 'react';
import Snackbar from 'react-native-snackbar';

import {useSelector} from 'react-redux';
import {SessionConnectionContext} from '../contexts/SessionConnectionProvider';
import {
  selectCredentials,
  selectCurrentMember,
} from '../redux/slices/authSlice';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';
import {
  endSetlistSession,
  startSetlistSession,
} from '../services/sessionsService';
import {reportError} from '../utils/error';
import {findSessionCurrentUserIsHosting, joinSession} from '../utils/sessions';
import useSessions from './useSessions';

export let socket = null;
export function resetSocket() {
  socket?.disconnect?.();
  socket = null;
}
export default function useSessionConnection(
  setlistId,
  {initializeHostedIfExists} = {},
) {
  const {activeSession, setActiveSession, hostedSession, setHostedSession} =
    useContext(SessionConnectionContext);
  const currentSubscription = useSelector(selectCurrentSubscription);
  const credentials = useSelector(selectCredentials);
  const [initializerRan, setInitializerRan] = useState(false);
  const isMemberOfActiveSession = activeSession && socket && !hostedSession;
  const isHost = hostedSession && socket && !activeSession;
  const {data: sessions, resolved} = useSessions(setlistId);
  const currentMember = useSelector(selectCurrentMember);

  useEffect(
    function initializeHostedSessionIfExists() {
      if (
        initializeHostedIfExists &&
        currentSubscription.isPro &&
        !isHost &&
        !isMemberOfActiveSession &&
        resolved &&
        !initializerRan
      ) {
        let alreadyStartedSession = findSessionCurrentUserIsHosting(
          currentMember,
          sessions,
        );

        if (alreadyStartedSession) {
          socket = joinSession(alreadyStartedSession.id, credentials);
          socket.emit('perform scroll', {
            scrollTop: 0,
            sessionId: alreadyStartedSession.id,
          });
          socket.emit('perform change song', {
            songIndex: 0,
            sessionId: alreadyStartedSession.id,
          });

          socket.on('inactive session', () => {
            Snackbar.show({
              text: 'Your session is now inactive',
              duration: Snackbar.LENGTH_SHORT,
            });
            setHostedSession(null);
            socket?.disconnect();
            socket = null;
          });

          Snackbar.show({
            duration: Snackbar.LENGTH_SHORT,
            text: 'Connected to your session!',
          });

          setHostedSession(alreadyStartedSession);
          setInitializerRan(true);
        }
      }
    },
    [
      initializeHostedIfExists,
      currentSubscription?.isPro,
      isHost,
      isMemberOfActiveSession,
      resolved,
      sessions,
      currentMember,
      credentials,
      setHostedSession,
      setActiveSession,
      initializerRan,
    ],
  );

  function joinSessionAsMember(session) {
    if (currentSubscription.isPro && !isHost) {
      socket = joinSession(session.id, credentials);

      socket.on('host ended session', () => {
        setActiveSession(null);
        socket?.disconnect();
        socket = null;
        Snackbar.show({
          duration: Snackbar.LENGTH_SHORT,
          text: 'Host ended session',
        });
      });

      setActiveSession(session);
    }
  }

  function leaveSessionAsMember(session) {
    socket.disconnect();
    setActiveSession(null);
  }

  async function endSession(session) {
    if (currentMember.id === session.user_id) {
      try {
        await endSetlistSession(session.setlist_id, session.id);
        socket?.emit('end session', {sessionId: session.id});
        setHostedSession(null);
        resetSocket();
      } catch (error) {
        reportError(error);
      }
    }
  }

  async function startSession(setId) {
    try {
      let {data: newSession} = await startSetlistSession(setId);
      socket = joinSession(newSession.id, credentials);

      socket.on('inactive session', () => {
        Snackbar.show({
          text: 'Your session is now inactive',
          duration: Snackbar.LENGTH_SHORT,
        });
        setHostedSession(null);
        socket?.disconnect();
        socket = null;
      });

      setHostedSession(newSession);
    } catch (error) {
      reportError(error);
    }
  }

  function emitSongChange(songIndex) {
    socket.emit('perform change song', {
      songIndex,
      sessionId: hostedSession.id,
    });
  }

  function emitScroll({
    nativeEvent: {
      contentOffset: {y},
    },
  }) {
    socket.emit('perform scroll', {scrollTop: y, sessionId: hostedSession.id});
  }

  return {
    joinSessionAsMember,
    leaveSessionAsMember,
    endSession,
    startSession,
    emitSongChange,
    emitScroll,
    activeSession,
    setActiveSession,
    isMemberOfActiveSession,
    hostedSession,
    setHostedSession,
    isHost,
  };
}
