import {MMKV} from 'react-native-mmkv';
import SongsApi from '../api/songsApi';
import {getTeamId} from '../utils/auth';

const storage = new MMKV({id: 'songs'});

export function getAllSongs({refresh = false} = {}) {
  if (refresh || !hasSongsSet()) {
    return SongsApi.getAll().then(({data}) => {
      data.forEach(setSongInStorage);
      return data;
    });
  } else {
    console.log('Getting songs from storage');
    return getSongsFromStorage();
  }
}

// NEEDS TO BE REVISITED
export function getSongById(id, {refresh} = {}) {
  return SongsApi.getOne(id).then(({data}) => data);
  if (refresh || !hasSongSet(id)) {
    return SongsApi.getOne(id).then(({data}) => {
      setSongInStorage(data);
      return data;
    });
  } else {
    console.log('Getting song from storage');
    return getSongFromStorage(id);
  }
}

export function createSong(song) {
  return SongsApi.createOne(song).then(({data}) => {
    setSongInStorage({
      ...data,
      themes: [],
      genres: [],
      capo: null,
      binders: [],
      format: {
        font: 'Roboto Mono',
        font_size: 18,
        bold_chords: false,
        italic_chords: false,
      },
      roadmap: [],
    });
    return data;
  });
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

function hasSongsSet() {
  return storage.getAllKeys().length > 0;
}

function setSongInStorage(song) {
  let stringified = JSON.stringify(song);
  storage.set(`${song.id}`, stringified);
}

function getSongsFromStorage() {
  let keys = storage.getAllKeys();
  if (keys.length === 0) return [];

  let songs = [];
  keys.forEach(key => {
    let stringified = storage.getString(key);
    songs.push(JSON.parse(stringified));
  });

  return songs;
}

function hasSongSet(id) {
  return storage.contains(`${id}`);
}

function getSongFromStorage(id) {
  let stringified = storage.getString(`${id}`);

  return JSON.parse(stringified);
}
