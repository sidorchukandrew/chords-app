import api from './api';
import {constructAuthHeaders, getTeamId} from '../utils/auth';

export default class InvitationsApi {
  static getAll() {
    return api().get(`/invitations?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static createOne(newInvite) {
    if (newInvite) {
      let allowedParams = {};

      if (newInvite.email) allowedParams.email = newInvite.email;

      allowedParams.team_id = getTeamId();

      return api().post('/invitations', allowedParams, {
        headers: constructAuthHeaders(),
      });
    }
  }

  static deleteOne(invitationId) {
    return api().delete(`/invitations/${invitationId}?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static resendOne(invitationId) {
    return api().post(
      `/invitations/${invitationId}/resend`,
      {
        team_id: getTeamId(),
      },
      {
        headers: constructAuthHeaders(),
      },
    );
  }
}
