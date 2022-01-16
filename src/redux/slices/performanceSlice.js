import {createSlice} from '@reduxjs/toolkit';

const performanceSlice = createSlice({
  name: 'auth',
  initialState: {
    songOnScreen: null,
    formatEdits: {},
    songEdits: {},
  },
  reducers: {
    setSongOnScreen: (state, action) => {
      state.songOnScreen = action.payload;
    },
    updateSongOnScreen: (state, action) => {
      state.songOnScreen = {...state.songOnScreen, ...action.payload};
    },
    storeFormatEdits: (state, {payload}) => {
      let songId = payload.songId;
      if (!state.formatEdits[songId]) state.formatEdits[songId] = {};

      let currentFormat = state.formatEdits[songId];
      state.formatEdits[songId] = {...currentFormat, ...payload.updates};
    },
    storeSongEdits: (state, {payload}) => {
      let songId = payload.songId;
      if (!state.songEdits[songId]) state.songEdits[songId] = {};

      let currentSongEdits = state.songEdits[songId];
      state.songEdits[songId] = {...currentSongEdits, ...payload.updates};
    },
    clearEdits: state => {
      state.formatEdits = {};
      state.songEdits = {};
    },
    clearEditsForSong: (state, {payload: songId}) => {
      delete state.formatEdits[songId];
      delete state.songEdits[songId];
    },
  },
});

export default performanceSlice.reducer;

export const {
  setSongOnScreen,
  updateSongOnScreen,
  storeFormatEdits,
  storeSongEdits,
  clearEdits,
  clearEditsForSong,
} = performanceSlice.actions;

export const selectSongOnScreen = state => state.performance.songOnScreen;

export const selectFormatEdits = state => state.performance.formatEdits;
export const selectSongEdits = state => state.performance.songEdits;
