import {ActionType} from './action';

const initialState = {
  genre: 'all',
  films: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: state.genre,
      };
    case ActionType.GET_FILMS:
      return {
        ...state,
        films: state.films,
      };
    default:
      return state;
  }
};

export {reducer};
