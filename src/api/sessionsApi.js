import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class SessionsApi {
  static getActiveSessionsBySetlistId(setlistId) {
    return api().get(`/setlists/${setlistId}/sessions?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }
}
