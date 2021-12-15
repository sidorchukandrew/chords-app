import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticating: true,
    accessToken: '',
    clientId: '',
    email: '',
    isLoggedIn: false,
    team: null,
  },
  reducers: {
    setAuthenticating: (state, action) => {
      state.authenticating = action.payload;
    },
    login: state => {
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
    loginTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export default authSlice.reducer;

export const selectIsLoggedIn = state =>
  state?.auth.isLoggedIn && state?.auth.team;
export const {login, logout, loginTeam} = authSlice.actions;
