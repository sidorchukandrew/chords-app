import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class BindersApi {
  static getAll() {
    return api().get(`/binders?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static getOne(id) {
    return api().get(`/binders/${id}?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static createOne(binder) {
    return api().post('/binders', binder, {
      headers: constructAuthHeaders(),
    });
  }

  static addSongs(id, songIds) {
    if (songIds.length > 0) {
      return api().post(
        `/binders/${id}/songs`,
        {song_ids: songIds, team_id: getTeamId()},
        {headers: constructAuthHeaders()},
      );
    }
  }
}
