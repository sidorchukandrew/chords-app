import api from './api';
import {constructAuthHeaders} from '../utils/auth';

export default class SettingsApi {
  static getNotificationSettings() {
    return api().get('/users/me/notification_settings', {
      headers: constructAuthHeaders(),
    });
  }
}
