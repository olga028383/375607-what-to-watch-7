
export const ActionType = {
  CHANGE_GENRE: 'filter/changeGenre',
  SET_FILMS: 'data/setFilms',
  SET_FILM_PROMO: 'data/setFilmPromo',
  LOAD_DATA: 'data/loadData',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTER: 'redirect',
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  setFilms: (films) => ({
    type: ActionType.SET_FILMS,
    payload : films,
  }),
  setFilmPromo: (film) => ({
    type: ActionType.SET_FILM_PROMO,
    payload : film,
  }),
  loadData: () => ({
    type: ActionType.LOAD_DATA,
    payload: true,
  }),
  requireAuthorization: (status, user) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    status: status,
    user: user,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirect: (url) =>({
    type: ActionType.REDIRECT_TO_ROUTER,
    payload: url,
  }),
};
