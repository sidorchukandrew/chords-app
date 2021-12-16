import {constructAuthHeaders, getTeamId} from '../utils/auth';
import api from './api';

export default class TeamsApi {
  static getAll() {
    return api().get('/teams', {headers: constructAuthHeaders()});
  }

  static getCurrentTeam() {
    return api().get(`/teams/${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static createOne(team) {
    return api().post('/teams', team, {headers: constructAuthHeaders()});
  }
}
