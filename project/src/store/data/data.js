import {ActionType} from '../action';

const initialState = {
  isDataLoaded: false,
  films: [],
  promo: {},
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILMS:
      return {
        ...state,
        films: action.payload,
      };
    case ActionType.SET_IS_LOAD_DATA:
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

export {data};
