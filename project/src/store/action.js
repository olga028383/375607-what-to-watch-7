
export const ActionType = {
  CHANGE_GENRE: 'filter/changeGenre',
  SET_FILMS: 'data/setFilms',
  SET_FILM_PROMO: 'data/setFilmPromo',
  LOAD_DATA: 'data/loadData',
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
};
