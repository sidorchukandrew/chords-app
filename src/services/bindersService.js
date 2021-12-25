import BindersApi from '../api/bindersApi';
import {getTeamId} from '../utils/auth';

export function getAllBinders() {
  return BindersApi.getAll();
}

export function getBinderById(id) {
  return BindersApi.getOne(id);
}

export function createBinder(binder) {
  let params = {
    ...binder,
    team_id: getTeamId(),
  };

  return BindersApi.createOne(params);
}

export function addSongsToBinder(binderId, songIds) {
  return BindersApi.addSongs(binderId, songIds);
}

export function deleteBinder(binderId) {
  return BindersApi.deleteOne(binderId);
}

export function updateBinder(binderId, updates) {
  let params = {
    ...updates,
    team_id: getTeamId(),
  };

  return BindersApi.updateOne(binderId, params);
}

export function removeSongFromBinder(binderId, songId) {
  return BindersApi.removeSong(binderId, songId);
}
