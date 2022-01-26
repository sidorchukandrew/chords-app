import {createSlice} from '@reduxjs/toolkit';
import {getAppearanceStorage} from '../../services/appearanceService';

const initialState = {
  theme: getAppearanceStorage().getString('theme'),
};

export const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setTheme: (state, {payload}) => {
      state.theme = payload;
      getAppearanceStorage().set('theme', payload);
    },
  },
});

export const {setTheme} = appearanceSlice.actions;

export default appearanceSlice.reducer;

export const selectCurrentTheme = state => state.appearance.theme;
