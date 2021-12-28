import {createSlice} from '@reduxjs/toolkit';

const performanceSlice = createSlice({
  name: 'auth',
  initialState: {
    songOnScreen: null,
  },
  reducers: {
    setSongOnScreen: (state, action) => {
      state.songOnScreen = action.payload;
    },
    updateSongOnScreen: (state, action) => {
      state.songOnScreen = {...state.songOnScreen, ...action.payload};
    },
  },
});

export default performanceSlice.reducer;

export const {setSongOnScreen, updateSongOnScreen} = performanceSlice.actions;

export const selectSongOnScreen = state => state.performance.songOnScreen;
