import {getSongById, getSongFromStorage} from './songsService';

import {MMKV} from 'react-native-mmkv';
import SetlistsApi from '../api/setlistsApi';
import {getTeamId} from '../utils/auth';
import {reportError} from '../utils/error';

const storage = new MMKV({id: 'setlists'});

export function getAllSetlists({refresh = false} = {}) {
  if (refresh || !hasSetlistsSet()) {
    return SetlistsApi.getAll().then(({data}) => {
      data.forEach(expandSongsAndPersist);
      return getSetlistsFromStorage();
    });
  } else {
    return getSetlistsFromStorage();
  }
}

export function getSetlistById(id, {refresh = false} = {}) {
  if (refresh || !hasSetlistSet(id)) {
    return SetlistsApi.getOne(id).then(({data}) => {
      setSetlistInStorage(data);
      return getSetlistFromStorage(id);
    });
  } else {
    let setlist = getSetlistFromStorage(id);
    let songs = setlist.songs?.map(song => ({
      ...getSongById(song.id),
      position: song.position,
    }));
    setlist.songs = songs;
    return setlist;
  }
}

export function createSetlist(setlist) {
  let params = {
    name: setlist.name,
    scheduled_date: setlist.scheduledDate,
    team_id: getTeamId(),
  };

  return SetlistsApi.createOne(params).then(({data}) => {
    setSetlistInStorage({...data, songs: []});
    return data;
  });
}

export function addSongsToSetlist(setlistId, songIds) {
  let params = {
    team_id: getTeamId(),
    song_ids: songIds,
  };

  return SetlistsApi.addSongs(setlistId, params).then(({data: addedSongs}) => {
    if (hasSetlistSet(setlistId)) {
      let setlist = getSetlistFromStorage(setlistId);
      setlist.songs = setlist.songs.concat(addedSongs);

      setSetlistInStorage(setlist);
    }
    return addedSongs;
  });
}

export function removeSongFromSetlist(setlistId, songId) {
  return SetlistsApi.removeSong(setlistId, songId).then(() => {
    if (hasSetlistSet(setlistId)) {
      let setlist = getSetlistFromStorage(setlistId);
      setlist.songs = setlist.songs?.filter(song => song.id !== songId);

      setSetlistInStorage(setlist);
    }
  });
}

export function deleteSetlist(setlistId) {
  storage.delete(`${setlistId}`);
  return SetlistsApi.deleteOne(setlistId);
}

export function updateSetlist(setlistId, updates) {
  let params = {
    team_id: getTeamId(),
    ...updates,
  };

  return SetlistsApi.updateOne(setlistId, params).then(({data}) => {
    if (hasSetlistSet(setlistId)) {
      let setlist = getSetlistFromStorage(setlistId);

      setSetlistInStorage({...setlist, ...data});
    }

    return data;
  });
}

export function updateScheduledSong(
  setlistId,
  songId,
  position,
  reorderedSongs,
) {
  let apiUpdates = {
    position,
    team_id: getTeamId(),
  };

  return SetlistsApi.updateScheduledSong(setlistId, songId, apiUpdates).then(
    () => {
      if (hasSetlistSet(setlistId)) {
        let setlist = getSetlistFromStorage(setlistId);
        setlist.songs = reorderedSongs;

        setSetlistInStorage(setlist);
      }
    },
  );
}

function expandSongsAndPersist(setlist) {
  try {
    let songs = setlist.scheduled_songs?.map(scheduledSong => {
      let song = getSongById(scheduledSong.song_id);
      if (song) song.position = scheduledSong.position;
      return song;
    });

    let updatedSetlist = {...setlist, songs};
    delete updatedSetlist.scheduled_songs;

    setSetlistInStorage(updatedSetlist);
  } catch (error) {
    reportError(error);
  }
}

function hasSetlistsSet() {
  return storage.getAllKeys().length > 0;
}

function setSetlistInStorage(setlist) {
  let stringified = JSON.stringify(setlist);
  storage.set(`${setlist.id}`, stringified);
}

function getSetlistsFromStorage() {
  let keys = storage.getAllKeys();
  if (keys.length === 0) return null;

  let setlists = [];
  keys.forEach(key => {
    let stringified = storage.getString(key);
    setlists.push(JSON.parse(stringified));
  });

  return setlists;
}

function hasSetlistSet(id) {
  return storage.contains(`${id}`);
}

function getSetlistFromStorage(id) {
  let stringified = storage.getString(`${id}`);

  return JSON.parse(stringified);
}

export function clearAllSetlists() {
  storage.clearAll();
}
