import {useSelector} from 'react-redux';
import {selectCurrentTheme} from '../redux/slices/appearanceSlice';

export function useTheme() {
  const theme = useSelector(selectCurrentTheme);

  return theme === 'dark' ? DARK : LIGHT;
}

const LIGHT = {
  text: {
    primary: {color: 'black'},
    secondary: {color: '#505050'},
    disabled: {color: '#d0d0d0'},
  },
  surface: {
    primary: {backgroundColor: 'white'},
    tertiary: {backgroundColor: '#eaeaea'},
  },
  border: {
    primary: {borderColor: '#eaeaea'},
  },
  theme: 'light',
  isDark: false,
  icon: {
    primary: 'black',
    secondary: '#505050',
    blue: '#2464eb',
  },
  lightBlue: {
    background: {backgroundColor: '#ddf4ff'},
  },
  blue: {
    // background: {backgroundColor: }
    text: {
      color: '#2464eb',
    },
  },
};

const DARK = {
  text: {
    primary: {color: '#c8d1d9'},
    secondary: {color: '#8b949e'},
    disabled: {color: '#8B949E'},
  },
  surface: {
    primary: {backgroundColor: 'black'},
    secondary: {backgroundColor: '#0e1117'},
    tertiary: {backgroundColor: '#161b22'},
  },
  border: {
    primary: {
      borderColor: '#30363d',
    },
  },
  theme: 'dark',
  isDark: true,
  icon: {
    primary: '#c8d1d9',
    secondary: '#8b949e',
    blue: '#3b82f6',
  },
  lightBlue: {
    background: {backgroundColor: '#14233a'},
    text: {color: '#58a6ff'},
  },
  blue: {
    background: {backgroundColor: '#58a6ff'},
    text: {
      color: '#3b82f6',
    },
  },
};
