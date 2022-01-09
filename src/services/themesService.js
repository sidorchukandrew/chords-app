import ThemesApi from '../api/themesApi';
import {getTeamId} from '../utils/auth';

export function getAllThemes() {
  return ThemesApi.getAll();
}

export function createTheme(name) {
  let params = {
    name,
    team_id: getTeamId(),
  };

  return ThemesApi.createOne(params);
}
