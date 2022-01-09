import GenresApi from '../api/genresApi';

export function getAllGenres() {
  return GenresApi.getAll();
}
