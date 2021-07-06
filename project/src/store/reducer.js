import {ActionType} from './action';
import {ALL_GENRES} from '../constants.js';

const initialState = {
  genre: ALL_GENRES,
  films: [],
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    case ActionType.GET_FILMS:
      return {
        ...state,
        films: action.payload,
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

export {reducer};
