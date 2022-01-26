import store from '../redux/store';

const DARK = {
  text: {
    primary: '#c9d1d9',
    secondary: '',
  },
  surface: {
    primary: 'black',
    secondary: '',
  },
  border: {
    primary: '',
  },
  colors: {
    blue: '',
    red: '',
  },
};

const LIGHT = {
  text: {
    primary: 'black',
    secondary: '',
  },
  surface: {
    primary: 'white',
    secondary: '',
  },
  border: {
    primary: '',
  },
  colors: {
    blue: '',
    red: '',
  },
};

export function getColorPalette() {
  return store.getState()?.appearance?.theme === 'dark' ? DARK : LIGHT;
}
