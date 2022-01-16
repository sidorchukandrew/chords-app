export function isEmpty(object) {
  if (object) {
    return Object.keys(object).length === 0;
  } else {
    return true;
  }
}
