import {requireAuthorization, redirect, logout as logoutAction} from './action';
import {ApiRoute, AuthorizationStatus, AppRoute} from '../constants';
import {adaptToClientFilm, adaptToClientUser, adaptToClientComment} from './adapters';

export const fetchFilms = (api) => (
  api.get(ApiRoute.FILMS)
    .then(({data}) => data.map(adaptToClientFilm))
);

export const fetchFilm = (id, api) => (
  api.get(`${ApiRoute.FILMS}/${id}`)
    .then(({data}) => adaptToClientFilm(data))
);

export const fetchComments = (filmId, api) => (
  api.get(`${ApiRoute.COMMENTS}/${filmId}`)
    .then(({data}) =>  data.map(adaptToClientComment))
);

export const sendComment = (rating, comment, filmId, api) => api.post(`${ApiRoute.COMMENTS}/${filmId}`, {rating, comment});

export const fetchSimilarFilms = (filmId, api) => (
  api.get(`${ApiRoute.FILMS}/${filmId}${ApiRoute.SIMILAR}`)
    .then(({data}) => data.map(adaptToClientFilm))
);

export const fetchFavoriteFilms = (api) => (
  api.get(ApiRoute.FAVORITE)
    .then(({data}) => data.map(adaptToClientFilm))
);

export const addFavoriteFilm = (filmId, status, api) => api.post(`${ApiRoute.FAVORITE}/${filmId}/${status}`).then(({data}) => adaptToClientFilm(data));

export const fetchFilmPromo = (api) => (
  api.get(ApiRoute.FILM_PROMO)
    .then(({data}) => adaptToClientFilm(data))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({data}) => dispatch(requireAuthorization(AuthorizationStatus.AUTH, adaptToClientUser(data))))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(requireAuthorization(AuthorizationStatus.AUTH, adaptToClientUser(data)));
      dispatch(redirect(AppRoute.ROOT));
    })
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(({data}) => localStorage.removeItem('token'))
    .then(() => dispatch(logoutAction()))
);
