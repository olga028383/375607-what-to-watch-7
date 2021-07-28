import {ActionType} from '../action';
import {ALL_GENRES} from '../../constants';

const initialState = {
  genre: ALL_GENRES,
  api: {},
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    case ActionType.GET_API:
      return {
        ...state,
        api: action.payload,
      };
    default:
      return state;
  }
};

export {application};
