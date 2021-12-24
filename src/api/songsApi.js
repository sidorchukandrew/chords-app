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

  static createOne(song) {
    let params = {
      ...song,
      team_id: getTeamId(),
    };

    return api().post('/songs', params, {headers: constructAuthHeaders()});
  }

  static updateOne(songId, updates) {
    return api().put(`/songs/${songId}`, updates, {
      headers: constructAuthHeaders(),
    });
  }

  static deleteOne(songId) {
    return api().delete(`/songs/${songId}?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }
}
