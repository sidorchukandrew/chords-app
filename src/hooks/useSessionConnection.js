import {useEffect, useContext} from 'react';

import {useSelector} from 'react-redux';
import {SessionConnectionContext} from '../contexts/SessionConnectionProvider';
import {selectCredentials} from '../redux/slices/authSlice';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';
import {joinSession} from '../utils/sessions';

export let socket = null;
export function resetSocket() {
  socket?.disconnect?.();
  socket = null;
}
export default function useSessionConnection(setlistId) {
  const {activeSessionDetails, setActiveSessionDetails} = useContext(
    SessionConnectionContext,
  );
  const currentSubscription = useSelector(selectCurrentSubscription);
  const credentials = useSelector(selectCredentials);
  const isMemberOfActiveSession =
    !activeSessionDetails.isHost &&
    socket &&
    activeSessionDetails.activeSession;

  useEffect(() => {
    if (setlistId && currentSubscription.isPro) {
      // check if there are any sessions you are in charge of and auto connect to it if one is found
    }
  }, [setlistId, currentSubscription.isPro]);

  function joinSessionAsMember(session) {
    if (currentSubscription.isPro) {
      socket = joinSession(session.id, credentials);
      setActiveSessionDetails({isHost: false, activeSession: session});
    }
  }

  function leaveSessionAsMember(session) {
    socket.disconnect();
    setActiveSessionDetails({isHost: false, socket: null, activeSession: null});
  }

  return {
    joinSessionAsMember,
    leaveSessionAsMember,
    activeSessionDetails,
    setActiveSessionDetails,
    isMemberOfActiveSession,
  };
}
