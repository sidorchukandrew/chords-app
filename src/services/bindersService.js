import BindersApi from '../api/bindersApi';

export function getAllBinders() {
  return BindersApi.getAll();
}

export function getBinderById(id) {
  return BindersApi.getOne(id);
}
