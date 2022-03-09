import {createSlice} from '@reduxjs/toolkit';
import {getAppearanceStorage} from '../../services/appearanceService';

const initialState = {
  theme: getAppearanceStorage().getString('theme'),
  toolbars: JSON.parse(getAppearanceStorage().getString('toolbars')) || {},
};

export const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setTheme: (state, {payload}) => {
      state.theme = payload;
      getAppearanceStorage().set('theme', payload);
    },
    setToolbars: (state, {payload}) => {
      state.toolbars = {...state.toolbars, ...payload};
      getAppearanceStorage().set('toolbars', state.toolbars);
    },
  },
});

export const {setTheme, setToolbars} = appearanceSlice.actions;

export default appearanceSlice.reducer;

export const selectCurrentTheme = state => state.appearance.theme;
export const selectToolbars = state => state.appearance.toolbars;
