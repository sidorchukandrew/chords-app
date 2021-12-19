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
