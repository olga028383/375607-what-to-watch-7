import {ActionType} from './action';
import {ALL_GENRES, AuthorizationStatus} from '../constants.js';

const initialState = {
  genre: ALL_GENRES,
  films: [],
  promo: {},
  user: {},
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.status,
        user: action.user,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    case ActionType.REDIRECT_TO_ROUTER:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};

export {reducer};
