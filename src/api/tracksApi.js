import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class TracksApi {
  static createBulk(tracks, songId) {
    return api().post(
      `/songs/${songId}/tracks?team_id=${getTeamId()}`,
      tracks,
      {
        headers: constructAuthHeaders(),
      },
    );
  }

  static deleteOne(trackId, songId) {
    return api().delete(
      `/songs/${songId}/tracks/${trackId}?team_id=${getTeamId()}`,
      {headers: constructAuthHeaders()},
    );
  }
}
