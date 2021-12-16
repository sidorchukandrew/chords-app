import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticating: true,
    accessToken: '',
    client: '',
    email: '',
    isLoggedIn: false,
    currentTeam: null,
    currentUser: null,
    currentMember: null,
  },
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
  state?.auth.isLoggedIn &&
  state?.auth.currentTeam &&
  state?.auth.currentMember;

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
