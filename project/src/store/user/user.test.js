import {user} from './user';
import {ActionType} from '../action';
import {AuthorizationStatus} from '../../constants';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(user(undefined, {}))
      .toEqual({authorizationStatus: AuthorizationStatus.UNKNOWN, user: {}});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.UNKNOWN, user: {}};

    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: AuthorizationStatus.AUTH,
      user: {id: 1},
    };

    expect(user(state, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH, user: {id: 1}});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {

    const requiredAuthorizationAction = {
      type: ActionType.LOGOUT,
    };

    expect(user({authorizationStatus: AuthorizationStatus.AUTH, user: {id: 1}}, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH, user: {}});

  });

});
