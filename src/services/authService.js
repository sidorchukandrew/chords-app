import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({id: 'auth'});

export function setUserInStorage(user) {
  setInStorage('currentUser', user);
}

export function setTeamInStorage(team) {
  setInStorage('currentTeam', team);
}

export function setMemberInStorage(member) {
  setInStorage('currentMember', member);
}

export function setAuthInStorage({accessToken, client, uid}) {
  setInStorage('accessToken', accessToken);
  setInStorage('client', client);
  setInStorage('uid', uid);
}

function setInStorage(name, object) {
  let stringified = JSON.stringify(object);

  storage.set(name, stringified);
}

export function getAuthStorage() {
  return storage;
}

export function getCurrentTeam() {
  let currentTeam = storage.getString('currentTeam');

  return currentTeam ? JSON.parse(currentTeam) : null;
}

export function getCurrentUser() {
  let currentUser = storage.getString('currentUser');

  return currentUser ? JSON.parse(currentUser) : null;
}

export function getCurrentMember() {
  let currentMember = storage.getString('currentMember');

  return currentMember ? JSON.parse(currentMember) : null;
}

export function clearAuthStorage() {
  storage.clearAll();
}
