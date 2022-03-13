import {createSlice} from '@reduxjs/toolkit';
import {getAppearanceStorage} from '../../services/appearanceService';

const initialState = {
  theme: getAppearanceStorage().getString('theme'),
  showSetlistNavigation: getAppearanceStorage().getBoolean(
    'showSetlistNavigation',
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
  },
});

export const {setTheme, setShowSetlistNavigation} = appearanceSlice.actions;

export default appearanceSlice.reducer;

export const selectCurrentTheme = state => state.appearance.theme;
export const selectShowSetlistNavigation = state =>
  state.appearance.showSetlistNavigation;
