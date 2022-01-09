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

  static addGenres(songId, genreIds) {
    if (genreIds.length > 0) {
      return api().post(
        `/songs/${songId}/genres?team_id=${getTeamId()}`,
        {genre_ids: genreIds},
        {headers: constructAuthHeaders()},
      );
    }
  }

  static removeGenre(songId, genreId) {
    return api().delete(
      `/songs/${songId}/genres?genre_ids[]=${genreId}&team_id=${getTeamId()}`,
      {headers: constructAuthHeaders()},
    );
  }

  static addThemes(songId, themeIds) {
    if (themeIds.length > 0) {
      return api().post(
        `/songs/${songId}/themes?team_id=${getTeamId()}`,
        {theme_ids: themeIds},
        {headers: constructAuthHeaders()},
      );
    }
  }

  static removeTheme(songId, themeId) {
    return api().delete(
      `/songs/${songId}/themes?theme_ids[]=${themeId}&team_id=${getTeamId()}`,
      {headers: constructAuthHeaders()},
    );
  }
}
