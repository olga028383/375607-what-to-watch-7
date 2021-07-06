
export const ActionType = {
  CHANGE_GENRE: 'filter/changeGenre',
  GET_FILMS: 'data/getFilms',
  GET_FILM_PROMO: 'data/getFilmPromo',
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
};
