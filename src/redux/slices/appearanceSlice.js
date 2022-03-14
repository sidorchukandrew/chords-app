import {createSlice} from '@reduxjs/toolkit';
import {getAppearanceStorage} from '../../services/appearanceService';

const initialState = {
  theme: getAppearanceStorage().getString('theme'),
  showSetlistNavigation: getAppearanceStorage().getBoolean(
    'showSetlistNavigation',
  ),
  disableSwipeInSetlist: getAppearanceStorage().getBoolean(
    'disableSwipeInSetlist',
  ),
};

export const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setTheme: (state, {payload}) => {
      state.theme = payload;
      getAppearanceStorage().set('theme', payload);
    },
    setShowSetlistNavigation: (state, {payload}) => {
      state.showSetlistNavigation = payload;
      getAppearanceStorage().set('showSetlistNavigation', payload);
    },
    setDisableSwipeInSetlist: (state, {payload}) => {
      state.disableSwipeInSetlist = payload;
      getAppearanceStorage().set('disableSwipeInSetlist', payload);
    },
  },
});

export const {setTheme, setShowSetlistNavigation, setDisableSwipeInSetlist} =
  appearanceSlice.actions;

export default appearanceSlice.reducer;

export const selectCurrentTheme = state => state.appearance.theme;
export const selectShowSetlistNavigation = state =>
  state.appearance.showSetlistNavigation;

export const selectDisableSwipeInSetlist = state =>
  state.appearance.disableSwipeInSetlist;
