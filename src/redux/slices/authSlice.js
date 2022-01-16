import {
  getAuthStorage,
  getCurrentMember,
  getCurrentTeam,
  getCurrentUser,
} from '../../services/authService';

import {createSlice} from '@reduxjs/toolkit';

function buildInitialState() {
  console.log('Building initial state');
  let authStorage = getAuthStorage();

  let accessToken = authStorage.getString('accessToken');
  let client = authStorage.getString('client');
  let uid = authStorage.getString('uid');
  let currentTeam = getCurrentTeam();
  let currentUser = getCurrentUser();
  let currentMember = getCurrentMember();

  let isLoggedIn = Boolean(
    accessToken && client && uid && currentTeam && currentMember && currentUser,
  );

  return {
    accessToken,
    client,
    uid,
    isLoggedIn,
    currentTeam,
    currentUser,
    currentMember,
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: buildInitialState(),
  reducers: {
    setAuthenticating: (state, action) => {
      state.authenticating = action.payload;
    },
    login: (state, {payload}) => {
      state.isLoggedIn = true;
      state.accessToken = payload.accessToken;
      state.uid = payload.uid;
      state.client = payload.client;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.accessToken = '';
      state.client = '';
      state.uid = '';
      state.currentMember = null;
      state.currentTeam = null;
      state.currentMember = null;
    },
    loginTeam: (state, {payload}) => {
      state.currentTeam = payload;
    },
    setMembership: (state, {payload}) => {
      state.currentMember = payload;
    },
    setCurrentUser: (state, {payload}) => {
      state.currentUser = payload;
    },
  },
});

export default authSlice.reducer;

export const selectIsLoggedIn = state =>
  !!(
    state?.auth.isLoggedIn &&
    state?.auth.currentTeam &&
    state?.auth.currentMember
  );

export const selectCurrentUser = state => state.auth?.currentUser;

export const {login, logout, loginTeam, setMembership, setCurrentUser} =
  authSlice.actions;

export const selectCurrentMember = state => {
  let permissions = state.auth?.currentMember.role.permissions.map(
    permission => permission.name,
  );

  return {
    permissions,
    ...state.auth.currentUser,
    can: permission => {
      return permissions?.includes(permission);
    },
  };
};
