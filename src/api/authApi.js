import Config from 'react-native-config';
import api from './api';

export default class AuthApi {
  static login(email, password) {
    console.log(Config);
    return api().post('/auth/sign_in', {email, password});
  }
}
