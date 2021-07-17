import browserHistory from '../../browser-history';
import {ActionType} from '../action';

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTER) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
