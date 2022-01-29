import FilesApi from '../api/filesApi';

export function getFilesForSong(songId) {
  return FilesApi.getFilesForSong(songId);
}

export function addFilesToSong(files, songId) {
  return FilesApi.addFilesToSong(songId, files);
}

export function deleteFileFromSong(fileId, songId) {
  return FilesApi.deleteSongFile(songId, fileId);
}

export function updateFileForSong(fileId, songId, updates) {
  return FilesApi.updateSongFile(songId, fileId, updates);
}
