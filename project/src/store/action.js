
export const ActionType = {
  CHANGE_GENRE: 'filter/changeGenre',
  GET_FILMS: 'data/getFilms',
  GET_FILM_PROMO: 'data/getFilmPromo',
  LOAD_DATA: 'data/loadData',
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  getFilms: (films) => ({
    type: ActionType.GET_FILMS,
    payload : films,
  }),
  getFilmPromo: (film) => ({
    type: ActionType.GET_FILM_PROMO,
    payload : film,
  }),
  loadData: () => ({
    type: ActionType.LOAD_DATA,
    payload: true,
  }),
};
