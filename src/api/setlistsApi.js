import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class SetlistsApi {
  static getAll() {
    return api().get(`/setlists?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static getOne(id) {
    return api().get(`/setlists/${id}?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static create(setlist) {
    return api().post('/setlists', setlist, {headers: constructAuthHeaders()});
  }

  static addSongs(setlistId, params) {
    return api().post(`/setlists/${setlistId}/songs`, params, {
      headers: constructAuthHeaders(),
    });
  }

  static removeSong(setlistId, songId) {
    return api().delete(
      `/setlists/${setlistId}/songs?song_ids[]=${songId}&team_id=${getTeamId()}`,
      {headers: constructAuthHeaders()},
    );
  }

  static deleteOne(setlistId) {
    return api().delete(`/setlists/${setlistId}?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static updateOne(setlistId, updates) {
    return api().put(`/setlists/${setlistId}`, updates, {
      headers: constructAuthHeaders(),
    });
  }
}
