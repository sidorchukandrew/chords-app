import axios from 'axios';
import Config from 'react-native-config';

export default function api() {
  return axios.create({
    baseURL: Config.API_URL,
  });
}
