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

export function semitonesAway(keyOne, keyTwo, chromaticScale = SEMITONES) {
  return Math.abs(chromaticScale[keyOne] - chromaticScale[keyTwo]);
}

export const SEMITONES = {
  A: 0,
  'A#': 1,
  Bb: 1,
  B: 2,
  C: 3,
  'C#': 4,
  Db: 4,
  D: 5,
  'D#': 6,
  Eb: 6,
  E: 7,
  F: 8,
  'F#': 9,
  Gb: 9,
  G: 10,
  'G#': 11,
  Ab: 11,
};

const SEMITONES_ARRAY = [
  ['A'],
  ['A#', 'Bb'],
  ['B'],
  ['C'],
  ['C#', 'Db'],
  ['D'],
  ['D#', 'Eb'],
  ['E'],
  ['F'],
  ['F#', 'Gb'],
  ['G'],
  ['G#', 'Ab'],
];

export function buildChromaticScale(startingNote) {
  let chromaticScale = {};
  let index = SEMITONES[startingNote];
  let scaleIndex = 0;

  do {
    for (
      let enharmonicIndex = 0;
      enharmonicIndex < SEMITONES_ARRAY[index].length;
      ++enharmonicIndex
    ) {
      chromaticScale[SEMITONES_ARRAY[index][enharmonicIndex]] = scaleIndex;
    }
    index = (index + 1) % 12;
    scaleIndex++;
  } while (index !== SEMITONES[startingNote]);

  return chromaticScale;
}

export function parseNote(key) {
  if (key?.length > 0) {
    if (isMinor(key)) {
      let notePart = key.substring(0, key.length - 1);
      return notePart;
    } else {
      return key;
    }
  } else {
    return key;
  }
}
