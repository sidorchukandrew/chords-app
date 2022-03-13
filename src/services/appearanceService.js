import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({id: 'appearance'});

export function getAppearanceStorage() {
  return storage;
}

export function clearAppearancePreferences() {
  storage.clearAll();
}
