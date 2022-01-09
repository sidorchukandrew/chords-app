import api from './api';
import {constructAuthHeaders} from '../utils/auth';

export default class GenresApi {
  static getAll() {
    return api().get('/genres', {headers: constructAuthHeaders()});
  }
}
