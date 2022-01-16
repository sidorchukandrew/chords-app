import {getSongFromStorage, hasSongSet, setSongInStorage} from './songsService';

import FormatsApi from '../api/formatsApi';
import {getTeamId} from '../utils/auth';

export function updateFormat(songId, formatId, updates) {
  let params = {...updates, team_id: getTeamId()};

  return FormatsApi.updateOne(formatId, params).then(({data}) => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);
      song.format = data;

      setSongInStorage(song);
    }
    return data;
  });
}

export function createFormat(songId, format) {
  let params = {...format, team_id: getTeamId(), song_id: songId};
  return FormatsApi.createOne(params).then(({data}) => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);
      song.format = data;

      setSongInStorage(song);
    }
    return data;
  });
}
