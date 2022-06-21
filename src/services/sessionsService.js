import SessionsApi from '../api/sessionsApi';

export function getSetlistActiveSessions(setlistId) {
  return SessionsApi.getActiveSessionsBySetlistId(setlistId);
}

export function endSetlistSession(setlistId, sessionId) {
  return SessionsApi.endSession(setlistId, sessionId);
}

export function startSetlistSession(setlistId) {
  return SessionsApi.startSession(setlistId);
}
