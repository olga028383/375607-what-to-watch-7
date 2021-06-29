export const ActionType = {
  CHANGE_GENRE: 'changeGenre',
  GET_FILMS: 'getFilms',
};

export const ActionCreator = {
  changeGenre: () => ({
    type: ActionType.CHANGE_GENRE,
  }),
  getFilms: () => ({
    type: ActionType.GET_FILMS,
  }),
};
