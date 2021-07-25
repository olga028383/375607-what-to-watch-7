import {ActionType} from '../action';
import {AuthorizationStatus} from '../../constants.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export {user};
