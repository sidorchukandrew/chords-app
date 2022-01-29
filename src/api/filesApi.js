import api from './api';
import {constructAuthHeaders, getTeamId} from '../utils/auth';

export default class FilesApi {
  static addImageToUser(image) {
    let formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    return api().post('/files/users', formData, {
      headers: constructAuthHeaders(),
    });
  }

  static addFilesToSong(songId, files) {
    let formData = new FormData();
    files.forEach(file => formData.append('files[]', file));

    return api().post(
      `/songs/${songId}/files?team_id=${getTeamId()}`,
      formData,
      {
        headers: constructAuthHeaders(),
      },
    );
  }

  static getFilesForSong(songId) {
    return api().get(`/songs/${songId}/files?team_id=${getTeamId()}`, {
      headers: constructAuthHeaders(),
    });
  }

  static deleteSongFile(songId, fileId) {
    return api().delete(
      `/songs/${songId}/files/${fileId}?team_id=${getTeamId()}`,
      {
        headers: constructAuthHeaders(),
      },
    );
  }

  static updateSongFile(songId, fileId, updates) {
    return api().put(
      `/songs/${songId}/files/${fileId}?team_id=${getTeamId()}`,
      updates,
      {
        headers: constructAuthHeaders(),
      },
    );
  }
}
