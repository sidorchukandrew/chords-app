import api from './api';

export default class AuthApi {
  static login(email, password) {
    return api().post('/auth/sign_in', {email, password});
  }
}
