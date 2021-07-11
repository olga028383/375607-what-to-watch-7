import {ActionType} from './action';
import {ALL_GENRES} from '../constants.js';

const initialState = {
  genre: ALL_GENRES,
  films: [],
  promo: {},
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    case ActionType.SET_FILMS:
      return {
        ...state,
        films: action.payload,
      };
    case ActionType.LOAD_DATA:
      return {
        ...state,
        isDataLoaded: true,
      };
    case ActionType.SET_FILM_PROMO:
      return {
        ...state,
        promo: action.payload,
      };
    default:
      return state;
  }
};

export {reducer};
