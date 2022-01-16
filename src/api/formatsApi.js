import api from './api';
import {constructAuthHeaders} from '../utils/auth';

export default class FormatsApi {
  static updateOne(formatId, updates) {
    return api().put(`/formats/${formatId}`, updates, {
      headers: constructAuthHeaders(),
    });
  }

  static createOne(format) {
    return api().post('/formats', format, {headers: constructAuthHeaders()});
  }
}
