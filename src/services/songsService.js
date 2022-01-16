import {MMKV} from 'react-native-mmkv';
import SongsApi from '../api/songsApi';
import {getTeamId} from '../utils/auth';

const storage = new MMKV({id: 'songs'});

export async function getAllSongs({refresh = false} = {}) {
  if (refresh || !hasSongsSet()) {
    console.log('getting songs from api');
    return SongsApi.getAll().then(({data}) => {
      data.forEach(setSongInStorage);
      return data;
    });
  } else {
    console.log('Getting songs from storage');
    return getSongsFromStorage();
  }
}

export function getSongById(id) {
  if (!hasSongSet(id)) {
    console.log('Does not have song set locally, fetching from api');
    return SongsApi.getAll().then(({data}) => {
      data.forEach(setSongInStorage);
      return getSongFromStorage(id);
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

  return SongsApi.updateOne(songId, params).then(({data}) => {
    if (hasSongSet(songId)) {
      let songInStorage = getSongFromStorage(songId);
      setSongInStorage({...songInStorage, ...data});
    }
    return data;
  });
}

export function deleteSong(songId) {
  storage.delete(`${songId}`);
  return SongsApi.deleteOne(songId);
}

export function addGenresToSong(genreIds, songId) {
  return SongsApi.addGenres(songId, genreIds).then(({data: genresAdded}) => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);
      if (!song.genres) song.genres = [];
      song.genres = song.genres.concat(genresAdded);

      setSongInStorage(song);
    }
    return genresAdded;
  });
}

export function removeGenreFromSong(genreId, songId) {
  return SongsApi.removeGenre(songId, genreId).then(() => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);

      song.genres = song.genres.filter(genre => genre.id !== genreId);
      console.log('Removed genre from song');
      setSongInStorage(song);
    }
  });
}

export function addThemesToSong(themeIds, songId) {
  return SongsApi.addThemes(songId, themeIds).then(({data: themesAdded}) => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);
      if (!song.themes) song.themes = [];
      song.themes = song.themes.concat(themesAdded);

      console.log('Adding themes to song in storage');
      setSongInStorage(song);
    }
    return themesAdded;
  });
}

export function removeThemeFromSong(themeId, songId) {
  return SongsApi.removeTheme(songId, themeId).then(() => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);

      song.themes = song.themes.filter(theme => theme.id !== themeId);
      console.log('Removed theme from song');
      setSongInStorage(song);
    }
  });
}

function hasSongsSet() {
  return storage.getAllKeys().length > 0;
}

export function setSongInStorage(song) {
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

export function hasSongSet(id) {
  return storage.contains(`${id}`);
}

export function getSongFromStorage(id) {
  let stringified = storage.getString(`${id}`);

  return JSON.parse(stringified);
}
