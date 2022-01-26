import api from './api';
import Config from 'react-native-config';

export default class AuthApi {
  static login(email, password) {
    return api().post('/auth/sign_in', {email, password});
  }

  static signUp(email, password, passwordConfirmation) {
    return api().post('/auth', {
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  }

  static sendResetPasswordInstructions(email) {
    return api().post('/auth/password', {
      email,
      redirect_url: `${Config.WEB_APP_URL}/reset_password`,
    });
  }
}
