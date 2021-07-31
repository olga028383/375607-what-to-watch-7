import {
  changeGenre,
  setFilms,
  setFilmPromoAction,
  loadData,
  requireAuthorization,
  logout,
  setApi,
  redirect,
  ActionType
} from './action';

import {AuthorizationStatus} from '../constants';

describe('Actions', () => {
  it('Action creator for changing genre.', () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: 'comedy',
    };

    const genre = 'comedy';

    expect(changeGenre(genre)).toEqual(expectedAction);
  });

  it('Action creator for getting a list of movies.', () => {
    const expectedAction = {
      type: ActionType.SET_FILMS,
      payload: [
        {id: 1, name: 'Name 1'},
        {id: 2, name: 'Name 2'},
      ],
    };

    const films = [
      {id: 1, name: 'Name 1'},
      {id: 2, name: 'Name 2'},
    ];

    expect(setFilms(films)).toEqual(expectedAction);
  });

  it('Action creator for getting a promo movie', () => {
    const expectedAction = {
      type: ActionType.SET_FILM_PROMO,
      payload: {id: 1, name: 'Name 1'},
    };

    const film = {id: 1, name: 'Name 1'};

    expect(setFilmPromoAction(film)).toEqual(expectedAction);
  });

  it('Action creator for data load.', () => {
    const expectedAction = {
      type: ActionType.SET_IS_LOAD_DATA,
      payload: true,
    };

    expect(loadData()).toEqual(expectedAction);
  });

  it('Action creator for user authorization.', () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: AuthorizationStatus.AUTH,
      user: {id: 1},
    };

    const status = AuthorizationStatus.AUTH;
    const user = {id: 1};

    expect(requireAuthorization(status, user)).toEqual(expectedAction);
  });

  it('Action creator for user logout.', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };

    expect(logout()).toEqual(expectedAction);
  });

  it('Action creator for to get the api method.', () => {
    const expectedAction = {
      type: ActionType.GET_API,
      payload: 'something',
    };

    const api = 'something';

    expect(setApi(api)).toEqual(expectedAction);
  });

  it('Action creator for redirect.', () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTER,
      payload: '/films',
    };
    const url = '/films';

    expect(redirect(url)).toEqual(expectedAction);
  });
});
