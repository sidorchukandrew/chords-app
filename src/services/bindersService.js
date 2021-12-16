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
