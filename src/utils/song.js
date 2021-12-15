export function hasAnyKeysSet(song) {
  return song.original_key || song.transposed_key;
}
