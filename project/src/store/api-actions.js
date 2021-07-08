import {ActionCreator} from './action';
import {ApiRoute} from '../constants';
import {adaptToClientFilm} from './adapters';

export const fetchFilms = (resolve) => (dispatch, _getState, api) => (
  api.get(ApiRoute.FILMS)
    .then(({data}) => data.map(adaptToClientFilm))
    .then((data) => dispatch(ActionCreator.getFilms(data)))
    .then((data) => resolve(data))
);

export const fetchFilmPromo = (resolve) => (dispatch, _getState, api) => (
  api.get(ApiRoute.FILM_PROMO)
    .then(({data}) => adaptToClientFilm(data))
    .then((data) => dispatch(ActionCreator.getFilmPromo(data)))
    .then((data) => resolve(data))
);
