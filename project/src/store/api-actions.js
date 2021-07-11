import {ApiRoute} from '../constants';
import {adaptToClientFilm} from './adapters';

export const fetchFilms = (api) => (
  api.get(ApiRoute.FILMS)
    .then(({data}) => data.map(adaptToClientFilm))
);

export const fetchFilmPromo = (api) => (
  api.get(ApiRoute.FILM_PROMO)
    .then(({data}) => adaptToClientFilm(data))
);
