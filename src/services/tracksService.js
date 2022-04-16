import TracksApi from '../api/tracksApi';
import {getSongFromStorage, hasSongSet, setSongInStorage} from './songsService';

export async function addTracksToSong(songId, tracks) {
  return TracksApi.createBulk(tracks, songId).then(({data}) => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);

      if (!song.tracks) song.tracks = [];
      song.tracks.push(data);
      setSongInStorage(song);
    }

    return data;
  });
}

export async function removeTrackFromSong(songId, trackIdToDelete) {
  if (hasSongSet(songId)) {
    let song = getSongFromStorage(songId);
    if (!song.tracks) song.tracks = [];
    song.tracks = song.tracks.filter(note => note.id !== trackIdToDelete);
    setSongInStorage(song);
  }
  return TracksApi.deleteOne(trackIdToDelete, songId);
}
