import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {ALL_GENRES, AuthorizationStatus, AppRoute} from '../../constants';
import {createApi} from '../../api';
import App from './app';

const film = {
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

const films = [{
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
}];

const user = {
  id: 1,
  email: 'test@email.ru',
  avatar: 'img/avatar.jpg',
  name: 'Bill Murray',
  token: '56565656',
};

let history = null;
let store = null;
let storeForPageSignIn = null;
let fakeApp = null;
let fakeAppPageSignIn = null;
let api = null;

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    api = createApi(jest.fn());

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: user},
      DATA: {isDataLoaded: true, films: films, promo: film},
      APPLICATION: {genre: ALL_GENRES, api: api},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>
    );

    storeForPageSignIn = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH, user: {}},
      DATA: {isDataLoaded: true, films: films, promo: film},
      APPLICATION: {genre: ALL_GENRES, api: api},
    });

    fakeAppPageSignIn = (
      <Provider store={storeForPageSignIn}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>
    );
  });

  it('should render "Home" when user navigate to "/"', () => {
    history.push(AppRoute.ROOT);
    render(fakeApp);

    expect(screen.getByText(/test@email.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    screen.getAllByText(/The Grand Budapest Hotel/i).forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should render "SingIn" when user navigate to "/login"', () => {
    history.push(AppRoute.LOGIN);
    render(fakeAppPageSignIn);

    screen.getAllByText(/Sign in/i).forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MY_LIST);
    render(fakeApp);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/test@email.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render "FilmDetail" when user navigate to "/films/id"', () => {
    history.push('/films/1');
    render(fakeApp);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render "Review" when user navigate to "/films/filmId/review"', () => {
    history.push('/films/1/review');
    render(fakeApp);
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
    screen.getAllByText(/Rating/i).forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/filmId"', () => {
    history.push('/player/1');
    render(fakeApp);
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);
    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('Returns a stub if no data is loaded', () => {
    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: user},
      DATA: {isDataLoaded: false, films: films, promo: film},
      APPLICATION: {genre: ALL_GENRES, api: api},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
