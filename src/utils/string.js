export function pluralize(list, word) {
  return list.length !== 1 ? word + 's' : word;
}
