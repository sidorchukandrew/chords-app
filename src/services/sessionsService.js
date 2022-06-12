import SessionsApi from '../api/sessionsApi';

export function getSetlistActiveSessions(setlistId) {
  return SessionsApi.getActiveSessionsBySetlistId(setlistId);
}
