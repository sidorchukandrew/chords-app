import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({id: 'auth'});

export function setSubscriptionInStorage(subscription) {
  setInStorage('currentSubscription', subscription);
}

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
  storage.set('accessToken', accessToken);
  storage.set('client', client);
  storage.set('uid', uid);
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

export function getCurrentSubscriptionFromStorage() {
  let currentMember = storage.getString('currentSubscription');

  return currentMember ? JSON.parse(currentMember) : null;
}

export function clearAuthStorage() {
  storage.clearAll();
}
