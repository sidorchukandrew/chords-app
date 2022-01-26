import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class UsersApi {
  static getTeamMembership() {
    return api().get(`/users/me/memberships?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static getCurrentUser() {
    return api().get('/users/me', {headers: constructAuthHeaders()});
  }

  static updateCurrentUser(updates) {
    return api().put('/users/me', updates, {headers: constructAuthHeaders()});
  }
}
