export const ActionType = {
  SET_FILMS: 'data/setFilms',
  SET_FILM_PROMO: 'data/setFilmPromo',
  SET_IS_LOAD_DATA: 'data/loadData',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  CHANGE_GENRE: 'application/changeGenre',
  REDIRECT_TO_ROUTER: 'application/redirect',
  GET_API: 'application/getApi',
};

const changeGenre = (genre) => ({
  type: ActionType.CHANGE_GENRE,
  payload: genre,
});

const setFilms = (films) => ({
  type: ActionType.SET_FILMS,
  payload: films,
});

const setFilmPromo = (film) => ({
  type: ActionType.SET_FILM_PROMO,
  payload: film,
});
const loadData = () => ({
  type: ActionType.SET_IS_LOAD_DATA,
  payload: true,
});

const requireAuthorization = (status, user) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  status: status,
  user: user,
});
const logout = () => ({
  type: ActionType.LOGOUT,
});

const setApi = (api) => ({
  type: ActionType.GET_API,
  payload: api,
});

const redirect = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTER,
  payload: url,
});

export {changeGenre, setFilms, setFilmPromo, loadData, requireAuthorization, logout, setApi, redirect};
