import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class CaposApi {
  static createOne(capo, songId) {
    return api().post(
      `/songs/${songId}/capos?team_id=${getTeamId()}`,
      {capo_key: capo},
      {headers: constructAuthHeaders()},
    );
  }

  static updateOne(capoId, songId, updates) {
    return api().put(
      `/songs/${songId}/capos/${capoId}?team_id=${getTeamId()}`,
      updates,
      {
        headers: constructAuthHeaders(),
      },
    );
  }

  static deleteOne(capoId, songId) {
    return api().delete(
      `/songs/${songId}/capos/${capoId}?team_id=${getTeamId()}`,
      {
        headers: constructAuthHeaders(),
      },
    );
  }
}
