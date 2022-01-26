import api from './api';
import {constructAuthHeaders} from '../utils/auth';

export default class SettingsApi {
  static getNotificationSettings() {
    return api().get('/users/me/notification_settings', {
      headers: constructAuthHeaders(),
    });
  }

  static updateNotificationSetting(id, updates) {
    return api().put(`/users/me/notification_settings/${id}`, updates, {
      headers: constructAuthHeaders(),
    });
  }
}
