export const MAJOR_KEYS = [
  'Ab',
  'A',
  'Bb',
  'B',
  'C',
  'C#',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
];
export const MINOR_KEYS = [
  'Am',
  'A#m',
  'Bbm',
  'Bm',
  'Cm',
  'C#m',
  'Dm',
  'D#m',
  'Em',
  'Fm',
  'F#m',
  'Gm',
  'G#m',
];

export const MAJOR_KEYS_WITH_SPACES = [
  ['Ab', 'A', ''],
  ['Bb', 'B', ''],
  ['', 'C', 'C#'],
  ['Db', 'D', ''],
  ['Eb', 'E', ''],
  ['', 'F', 'F#'],
  ['Gb', 'G', ''],
];

export const MINOR_KEYS_WITH_SPACES = [
  ['', 'Am', 'A#m'],
  ['Bbm', 'Bm', ''],
  ['', 'Cm', 'C#m'],
  ['', 'Dm', 'D#m'],
  ['Ebm', 'Em', ''],
  ['', 'Fm', 'F#m'],
  ['', 'Gm', 'G#m'],
];

export const COMMON_METERS = [
  {combined: '4/4', top: '4', bottom: '4'},
  {
    combined: '3/4',
    top: '3',
    bottom: '4',
  },
  {
    combined: '2/4',
    top: '2',
    bottom: '4',
  },
  {
    combined: '2/2',
    top: '2',
    bottom: '2',
  },
  {
    combined: '3/8',
    top: '3',
    bottom: '8',
  },
  {
    combined: '6/8',
    top: '6',
    bottom: '8',
  },
  {
    combined: '12/8',
    top: '12',
    bottom: '8',
  },
];

export function getHalfStepHigher(key) {
  let keys = isMinor(key) ? MINOR_KEYS : MAJOR_KEYS;

  let indexOfKey = keys.findIndex(keyInList => keyInList === key);
  if (indexOfKey > -1) {
    let indexOfNextKey = (indexOfKey + 1) % keys.length;
    return keys[indexOfNextKey];
  } else {
    return key;
  }
}

export function getHalfStepLower(key) {
  let keys = isMinor(key) ? MINOR_KEYS : MAJOR_KEYS;

  let indexOfKey = keys.findIndex(keyInList => keyInList === key);
  if (indexOfKey > -1) {
    let indexOfNextKey;

    if (indexOfKey - 1 === -1) {
      indexOfNextKey = keys.length - 1;
    } else {
      indexOfNextKey = indexOfKey - 1;
    }

    return keys[indexOfNextKey];
  } else {
    return key;
  }
}

export function isMinor(key) {
  if (key) {
    let lastChar = key.charAt(key.length - 1);
    return lastChar === 'm';
  } else {
    return key;
  }
}
