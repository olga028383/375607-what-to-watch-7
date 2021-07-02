import {ActionType} from './action';
import films from '../mocks/films.js';
import {ALL_GENRES} from '../constants.js';

const initialState = {
  genre: ALL_GENRES,
  films: films,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.genre,
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
