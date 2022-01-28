import {getSongFromStorage, hasSongSet, setSongInStorage} from './songsService';
import CaposApi from '../api/caposApi';

export function createCapoForSong(capoKey, songId) {
  console.log('Creating capo');
  return CaposApi.createOne(capoKey, songId).then(({data}) => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);
      song.capo = data;

      setSongInStorage(song);
    }
    return data;
  });
}

export function deleteCapoFromSong(capoId, songId) {
  if (hasSongSet(songId)) {
    let song = getSongFromStorage(songId);
    song.capo = null;

    setSongInStorage(song);
  }
  return CaposApi.deleteOne(capoId, songId);
}

export function updateCapo(capoId, songId, updatedCapoKey) {
  console.log('Updating capo', updatedCapoKey);
  return CaposApi.updateOne(capoId, songId, {capo_key: updatedCapoKey}).then(
    ({data}) => {
      console.log(data);
      if (hasSongSet(songId)) {
        let song = getSongFromStorage(songId);
        song.capo = data;

        setSongInStorage(song);
      }

      return data;
    },
  );
}
