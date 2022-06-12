import {constructAuthHeaders} from '../utils/auth';

import api from './api';

export default class SearchTracksApi {
  static searchAppleMusic(query) {
    return api().get(`/apple_music/search?query=${query}`, {
      headers: constructAuthHeaders(),
    });
  }

  static searchSpotify(query) {
    return api().get(`/spotify/search?query=${query}`, {
      headers: constructAuthHeaders(),
    });
  }

  static searchYouTube(query) {
    return api().get(`/youtube/search?query=${query}`, {
      headers: constructAuthHeaders(),
    });
  }
}
