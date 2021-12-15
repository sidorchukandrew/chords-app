import {constructAuthHeaders, getTeamId} from '../utils/auth';
import api from './api';

export default class SongsApi {
  static getAll() {
    return api().get(`/songs?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static getOne(id) {
    return api().get(`/songs/${id}?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }
}
