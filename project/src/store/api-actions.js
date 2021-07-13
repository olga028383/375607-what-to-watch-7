import {ActionCreator} from './action';
import {ApiRoute, AuthorizationStatus, AppRoute} from '../constants';
import {adaptToClientFilm, adaptToClientUser} from './adapters';

export const fetchFilms = (api) => (
  api.get(ApiRoute.FILMS)
    .then(({data}) => data.map(adaptToClientFilm))
);

export const fetchFilmPromo = (api) => (
  api.get(ApiRoute.FILM_PROMO)
    .then(({data}) => adaptToClientFilm(data))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({data}) => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH, adaptToClientUser(data))))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(({data}) => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH, adaptToClientUser(data))))
    .then(({data}) => dispatch(ActionCreator.redirect(AppRoute.ROOT))) //не происходит редирект
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(({data}) => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);
