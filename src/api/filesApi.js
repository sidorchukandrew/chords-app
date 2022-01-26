import api from './api';
import {constructAuthHeaders} from '../utils/auth';

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
}
