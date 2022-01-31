import NotesApi from '../api/notesApi';
import {getSongFromStorage, hasSongSet, setSongInStorage} from './songsService';

export function addNoteToSong(songId, coordinates) {
  return NotesApi.createOne(songId, coordinates).then(({data}) => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);
      if (!song.notes) song.notes = [];
      song.notes.push(data);
      setSongInStorage(song);
    }
    return data;
  });
}

export function updateNoteOnSong(noteId, songId, updates) {
  return NotesApi.updateOne(songId, noteId, updates).then(({data}) => {
    if (hasSongSet(songId)) {
      let song = getSongFromStorage(songId);
      if (!song.notes) song.notes = [];
      song.notes = song.notes.map(note => (note.id === noteId ? data : note));
      setSongInStorage(song);
    }
    return data;
  });
}

export function deleteNoteFromSong(noteIdToDelete, songId) {
  if (hasSongSet(songId)) {
    let song = getSongFromStorage(songId);
    if (!song.notes) song.notes = [];
    song.notes = song.notes.filter(note => note.id !== noteIdToDelete);
    setSongInStorage(song);
  }

  return NotesApi.deleteOne(songId, noteIdToDelete);
}
