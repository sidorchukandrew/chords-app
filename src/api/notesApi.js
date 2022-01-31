import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class NotesApi {
  static getAll(songId) {
    return api().get(`/songs/${songId}/notes?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static createOne(songId, coordinates) {
    return api().post(
      `/songs/${songId}/notes?team_id=${getTeamId()}`,
      coordinates,
      {headers: constructAuthHeaders()},
    );
  }

  static updateOne(songId, noteId, updates) {
    return api().put(
      `/songs/${songId}/notes/${noteId}?team_id=${getTeamId()}`,
      updates,
      {
        headers: constructAuthHeaders(),
      },
    );
  }

  static deleteOne(songId, noteId) {
    return api().delete(
      `/songs/${songId}/notes/${noteId}?team_id=${getTeamId()}`,
      {
        headers: constructAuthHeaders(),
      },
    );
  }
}
