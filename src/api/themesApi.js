import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class ThemesApi {
  static getAll() {
    return api().get(`/themes?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static createOne(theme) {
    return api().post('/themes', theme, {headers: constructAuthHeaders()});
  }
}
