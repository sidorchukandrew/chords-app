import SongsApi from '../api/songsApi';
import {getTeamId} from '../utils/auth';

export function getAllSongs() {
  return SongsApi.getAll();
}

export function getSongById(id) {
  return SongsApi.getOne(id);
}

export function createSong(song) {
  return SongsApi.createOne(song);
}

export function updateSong(songId, updates) {
  let params = {
    ...updates,
    team_id: getTeamId(),
  };

  return SongsApi.updateOne(songId, params);
}

export function deleteSong(songId) {
  return SongsApi.deleteOne(songId);
}

export function addGenresToSong(genreIds, songId) {
  return SongsApi.addGenres(songId, genreIds);
}

export function removeGenreFromSong(genreId, songId) {
  return SongsApi.removeGenre(songId, genreId);
}

export function addThemesToSong(themeIds, songId) {
  return SongsApi.addThemes(songId, themeIds);
}

export function removeThemeFromSong(themeId, songId) {
  return SongsApi.removeTheme(songId, themeId);
}
