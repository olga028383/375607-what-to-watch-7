import MockAdapter from 'axios-mock-adapter';
import {ActionType} from './action';
import {
  fetchFilms,
  fetchFilm,
  fetchComments,
  sendComment,
  fetchSimilarFilms,
  fetchFavoriteFilms,
  addFavoriteFilm,
  fetchFilmPromo,
  checkAuth,
  login,
  logout
} from './api-actions';
import {createApi} from '../api';
import {ApiRoute, AuthorizationStatus, AppRoute} from '../constants';

let api = null;

let answerFilm = {};

let answerFilmAdapt = {};

describe('Async operations', () => {
  beforeAll(() => {
    api = createApi(() => {});

    answerFilm ={
      'id': 1,
      'name': 'The Grand Budapest Hotel',
      'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
      'preview_image': 'img/the-grand-budapest-hotel.jpg',
      'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
      'background_color': '#ffffff',
      'video_link': 'https://some-link',
      'preview_video_link': 'https://some-link',
      'description': 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H.',
      'rating': 8.9,
      'scores_count': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'run_time': 99,
      'genre': 'Comedy',
      'released': 2014,
      'is_favorite': false,
    };

    answerFilmAdapt = {
      id: 1,
      name: 'The Grand Budapest Hotel',
      posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
      previewImage: 'img/the-grand-budapest-hotel.jpg',
      backgroundImage: 'img/the-grand-budapest-hotel-bg.jpg',
      backgroundColor: '#ffffff',
      videoLink: 'https://some-link',
      previewVideoLink: 'https://some-link',
      description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H.',
      rating: 8.9,
      scoresCount: 240,
      director: 'Wes Andreson',
      starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      runTime: 99,
      genre: 'Comedy',
      released: 2014,
      isFavorite: false,
    };
  });

  it('should make a correct API call to GET /films', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(ApiRoute.FILMS)
      .reply(200, answerFilm);

    fetchFilms(api)
      .then((data) => {
        expect(data).toEqual(answerFilmAdapt);
      });
  });

  it('should make a correct API call to GET /films/id', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`${ApiRoute.FILMS}/1`)
      .reply(200, answerFilm);

    return fetchFilm(1, api)
      .then((data) => {
        expect(data).toEqual(answerFilmAdapt);
      });
  });

  it('should make a correct API call to GET /promo', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(ApiRoute.FILM_PROMO)
      .reply(200, answerFilm);

    return fetchFilmPromo(api)
      .then((data) => {
        expect(data).toEqual(answerFilmAdapt);
      });
  });

  it('should make a correct API call to GET /comments/filmId', () => {
    const apiMock = new MockAdapter(api);

    const answer =
      [{
        id: 1,
        user: {
          id: 4,
          name: 'Kate Muir',
        },
        rating: 8.9,
        comment: 'Discerning travellers.',
        date: '2019-05-08T14:13:56.569Z',
      }];

    const answerAdapt = [{
      id: 1,
      userId: 4,
      userName: 'Kate Muir',
      rating: 8.9,
      comment: 'Discerning travellers.',
      date: '2019-05-08T14:13:56.569Z',
    }];

    apiMock
      .onGet(`${ApiRoute.COMMENTS}/1`)
      .reply(200, answer);


    return fetchComments(1, api)
      .then((data) => {
        expect(data).toEqual(answerAdapt);
      });
  });

  it('should make a correct API call to GET /films/id/similar', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`${ApiRoute.FILMS}/1${ApiRoute.SIMILAR}`)
      .reply(200, answerFilm);


    fetchSimilarFilms(1, api)
      .then((data) => {
        expect(data).toEqual(answerFilmAdapt);
      });
  });

  it('should make a correct API call to GET /favorite', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(ApiRoute.FAVORITE)
      .reply(200, answerFilm);

    fetchFavoriteFilms(api)
      .then((data) => {
        expect(data).toEqual(answerFilmAdapt);
      });
  });

  it('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(ApiRoute.LOGIN)
      .reply(200, {'id': 1, 'email': '', 'avatar_url': '', 'name': '', 'token': ''});

    return checkAuthLoader(dispatch, () => {
    }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          status: AuthorizationStatus.AUTH,
          user: {id: 1, email: '', avatar: '', name: '', token: ''},
        });
      });
  });

  it('should make a correct API call to POST /comments/filmId', () => {
    const apiMock = new MockAdapter(api);

    const answer =
      [{
        id: 1,
        user: {
          id: 4,
          name: 'Kate Muir',
        },
        rating: 8.9,
        comment: 'Discerning travellers.',
        date: '2019-05-08T14:13:56.569Z',
      }];

    const answerAdapt = [{
      id: 1,
      userId: 4,
      userName: 'Kate Muir',
      rating: 8.9,
      comment: 'Discerning travellers.',
      date: '2019-05-08T14:13:56.569Z',
    }];

    apiMock
      .onPost(`${ApiRoute.COMMENTS}/1`)
      .reply(200, answer);


    return sendComment('8.9', 'Discerning travellers.', 1, api)
      .then((data) => {
        expect(data).toEqual(answerAdapt);
      });
  });

  it('should make a correct API call to POST /favorite/filmId/status', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onPost(`${ApiRoute.FAVORITE}/1/1`)
      .reply(200, answerFilm);

    return addFavoriteFilm('1', '1', api)
      .then((data) => {
        expect(data).toEqual(answerFilmAdapt);
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@test.ru', password: '123456'};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(ApiRoute.LOGIN)
      .reply(200, {'id': 1, 'email': '', 'avatar_url': '', 'name': '', 'token': ''});

    return loginLoader(dispatch, () => {
    }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          status: AuthorizationStatus.AUTH,
          user: {id: 1, email: '', avatar: '', name: '', token: ''},
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTER,
          payload: AppRoute.ROOT,
        });
      });
  });

  it('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onDelete(ApiRoute.LOGOUT)
      .reply(204);

    return logoutLoader(dispatch, () => {
    }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGOUT,
        });
      });
  });
});
