export function hasAnyKeysSet(song) {
  return song.original_key || song.transposed_key || song.capo?.capo_key;
}

export function getPreferredKey(song) {
  if (song.capo) {
    return song.capo.capo_key;
  } else if (song.transposed_key) {
    return song.transposed_key;
  } else {
    return song.original_key;
  }
}
