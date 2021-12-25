import SetlistsApi from '../api/setlistsApi';
import {getTeamId} from '../utils/auth';

export function getAllSetlists() {
  return SetlistsApi.getAll();
}

export function getSetlistById(id) {
  return SetlistsApi.getOne(id);
}

export function createSetlist(setlist) {
  let params = {
    name: setlist.name,
    scheduled_date: setlist.scheduledDate,
    team_id: getTeamId(),
  };

  return SetlistsApi.create(params);
}

export function addSongsToSetlist(setlistId, songIds) {
  let params = {
    team_id: getTeamId(),
    song_ids: songIds,
  };

  return SetlistsApi.addSongs(setlistId, params);
}

export function removeSongFromSetlist(setlistId, songId) {
  return SetlistsApi.removeSong(setlistId, songId);
}

export function deleteSetlist(setlistId) {
  return SetlistsApi.deleteOne(setlistId);
}

export function updateSetlist(setlistId, updates) {
  let params = {
    team_id: getTeamId(),
    ...updates,
  };

  return SetlistsApi.updateOne(setlistId, params);
}
