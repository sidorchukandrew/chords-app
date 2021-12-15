import store from '../redux/store';

export function constructAuthHeaders() {
  let headers = {
    'access-token': store.getState()?.auth?.accessToken,
    client: store.getState()?.auth?.client,
    uid: store.getState()?.auth?.uid,
  };

  return headers;
}

export function getTeamId() {
  return store.getState()?.auth?.currentTeam.id;
}
