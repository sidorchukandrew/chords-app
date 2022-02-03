export function songMatches(song, query) {
  let lowercasedName = song.name?.toLowerCase();
  return lowercasedName.includes(query);
}

export function binderMatches(binder, query) {
  let lowercasedName = binder.name?.toLowerCase();
  return lowercasedName.includes(query);
}

export function setlistMatches(setlist, query) {
  let lowercasedName = setlist.name?.toLowerCase();
  //   console.log(`${lowercasedName}, ${query}`);
  //   console.log(lowercasedName.includes(query));
  //   console.log('------------------------------------');
  return lowercasedName.includes(query);
}
