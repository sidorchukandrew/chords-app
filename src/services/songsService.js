import SongsApi from '../api/songsApi';

export function getAllSongs() {
  return SongsApi.getAll();
}

export function getSongById(id) {
  return SongsApi.getOne(id);
}

export function createSong(song) {
  return SongsApi.createOne(song);
}
