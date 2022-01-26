import {
  getCurrentMember,
  getCurrentUser,
  setMemberInStorage,
  setUserInStorage,
} from './authService';

import UsersApi from '../api/usersApi';

export function updateCurrentUser(updates) {
  let currentUser = getCurrentUser();
  let updatedUser = {...currentUser, ...updates};

  setUserInStorage(updatedUser);

  let currentMember = getCurrentMember();
  let updatedMember = {...currentMember, ...updates};

  setMemberInStorage(updatedMember);
  return UsersApi.updateCurrentUser(updates);
}
