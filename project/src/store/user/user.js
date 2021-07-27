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
        authorizationStatus: action.status,
        user: action.user,
      };
    case ActionType.LOGOUT:
      return {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {},
      };
    default:
      return state;
  }
};

export {user};
