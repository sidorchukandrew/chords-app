import SetlistsApi from '../api/setlistsApi';

export function getAllSetlists() {
  return SetlistsApi.getAll();
}

export function getSetlistById(id) {
  return SetlistsApi.getOne(id);
}
