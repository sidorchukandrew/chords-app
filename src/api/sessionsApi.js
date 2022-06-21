import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class SessionsApi {
  static getActiveSessionsBySetlistId(setlistId) {
    return api().get(`/setlists/${setlistId}/sessions?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static endSession(setlistId, sessionId) {
    return api().put(
      `/setlists/${setlistId}/sessions/${sessionId}?team_id=${getTeamId()}`,
      {status: 'INACTIVE'},
      {headers: constructAuthHeaders()},
    );
  }

  static startSession(setlistId) {
    return api().post(
      `/setlists/${setlistId}/sessions?team_id=${getTeamId()}`,
      {status: 'ACTIVE'},
      {headers: constructAuthHeaders()},
    );
  }
}
