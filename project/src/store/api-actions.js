import {ActionCreator} from './action';
import {ApiRoute} from '../constants';
import {adaptToClientFilm} from './adapters';

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FILMS)
    .then(({data}) => data.map(adaptToClientFilm))
    .then((data) => dispatch(ActionCreator.getFilms(data)))
);
