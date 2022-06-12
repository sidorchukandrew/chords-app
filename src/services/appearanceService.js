import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({id: 'appearance'});

export function getAppearanceStorage() {
  return storage;
}

export function resetAppearancePreferences() {
  storage.set('theme', 'light');
  storage.set('showSetlistNavigation', false);
  storage.set('disableSwipeInSetlist', false);
}
