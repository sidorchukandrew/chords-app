import api from './api';

export default class AuthApi {
  static login(email, password) {
    // return fetch('https://chords-api-dev.herokuapp.com/auth/sign_in', {
    //   method: 'POST',
    //   body: {email, password},
    // });
    return api().post('/auth/sign_in', {email, password});
  }
}
