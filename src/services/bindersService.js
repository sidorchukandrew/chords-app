import BindersApi from '../api/bindersApi';
import {MMKV} from 'react-native-mmkv';
import {getTeamId} from '../utils/auth';

const storage = new MMKV({id: 'binders'});

export function getAllBinders({refresh = false} = {}) {
  if (refresh || !hasBindersSet()) {
    return BindersApi.getAll().then(({data}) => {
      data.forEach(setBinderInStorage);
      return data;
    });
  } else {
    console.log('Getting binders from storage');
    return getBindersFromStorage();
  }
}

export function getBinderById(id, {refresh = false} = {}) {
  if (refresh || !hasBinderSet(id)) {
    return BindersApi.getOne(id).then(({data}) => {
      setBinderInStorage(data);
      return data;
    });
  } else {
    return getBinderFromStorage(id);
  }
}

export function createBinder(binder) {
  let params = {
    ...binder,
    team_id: getTeamId(),
  };

  return BindersApi.createOne(params).then(({data}) => {
    setBinderInStorage({...data, songs: []});
    return data;
  });
}

export function addSongsToBinder(binderId, songIds) {
  return BindersApi.addSongs(binderId, songIds).then(({data: songsAdded}) => {
    if (hasBinderSet(binderId)) {
      console.log('Adding songs in storage');
      let binder = getBinderFromStorage(binderId);
      binder = {...binder, songs: [...binder.songs, ...songsAdded]};
      setBinderInStorage(binder);
    }

    return songsAdded;
  });
}

export function deleteBinder(binderId) {
  storage.delete(`${binderId}`);
  return BindersApi.deleteOne(binderId);
}

export function updateBinder(binderId, updates) {
  let params = {
    ...updates,
    team_id: getTeamId(),
  };

  return BindersApi.updateOne(binderId, params).then(({data}) => {
    console.log('updating binder in storage');
    setBinderInStorage(data);
    return data;
  });
}

export function removeSongFromBinder(binderId, songId) {
  if (hasBinderSet(binderId)) {
    let binder = getBinderFromStorage(binderId);
    let updatedSongs = binder.songs?.filter(song => song.id !== songId);
    binder.songs = updatedSongs;
    setBinderInStorage(binder);
  }

  return BindersApi.removeSong(binderId, songId);
}

function getBindersFromStorage() {
  let keys = storage.getAllKeys();
  if (keys.length === 0) return null;

  let binders = [];
  keys.forEach(key => {
    let stringified = storage.getString(key);
    binders.push(JSON.parse(stringified));
  });

  return binders;
}

function hasBindersSet() {
  return storage.getAllKeys().length > 0;
}

function hasBinderSet(id) {
  return storage.contains(`${id}`);
}

function getBinderFromStorage(id) {
  let stringified = storage.getString(`${id}`);

  return JSON.parse(stringified);
}

function setBinderInStorage(binder) {
  let stringified = JSON.stringify(binder);
  storage.set(`${binder.id}`, stringified);
}

export function clearAllBinders() {
  storage.clearAll();
}
