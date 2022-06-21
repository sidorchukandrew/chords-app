import Config from 'react-native-config';
import io from 'socket.io-client';

const SESSIONS_URL = Config.SESSIONS_URL;

export function findSessionCurrentUserIsHosting(user, sessions) {
  return sessions?.find(s => s.user_id === user.id);
}

export function joinSession(sessionId, credentials) {
  let s = io(SESSIONS_URL);

  s.emit('join session', {
    sessionId,
    auth: {
      token: credentials.accessToken,
      client: credentials.client,
      uid: credentials.uid,
    },
  });

  return s;
}
