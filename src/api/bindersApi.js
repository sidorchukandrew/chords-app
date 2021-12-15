import api from './api';
import {getTeamId, constructAuthHeaders} from '../utils/auth';

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
}
