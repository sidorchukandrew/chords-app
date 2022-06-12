import {constructAuthHeaders, getTeamId} from '../utils/auth';

import api from './api';

export default class EventsApi {
  static getAll() {
    return api().get(`/events?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static getOne(id) {
    return api().get(`/events/${id}?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static createOne(event) {
    return api().post(
      '/events',
      {
        ...event,
        team_id: getTeamId(),
      },
      {headers: constructAuthHeaders()},
    );
  }

  static deleteOne(id) {
    return api().delete(`/events/${id}?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static updateOne(updates, id) {
    return api().put(`/events/${id}?team_id=${getTeamId()}`, updates, {
      headers: constructAuthHeaders(),
    });
  }
}
