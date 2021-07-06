
export const ActionType = {
  CHANGE_GENRE: 'filter/changeGenre',
  GET_FILMS: 'data/getFilms',
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
};
