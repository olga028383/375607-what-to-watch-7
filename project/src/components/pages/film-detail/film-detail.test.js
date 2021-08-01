import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../../api';
import {render, screen, act} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import FilmDetail from './film-detail';
import {fetchFilm} from '../../../store/api-actions';
import {ALL_GENRES, AuthorizationStatus} from "../../../constants";

const film = {
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
let fakeApp = null;
let history = null;
let store = null;
jest.mock('../../../store/api-actions');

describe('Component: FilmDetail', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    history.push('/films/1');
    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
      DATA: {isDataLoaded: true, films: [film], promo: {}},
      APPLICATION: {genre: ALL_GENRES, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <FilmDetail/>;
        </Router>
      </Provider>
    );
  });

  it('should display page film detail not found', async() => {
    fetchFilm.mockReturnValue(Promise.reject(film));
    render(fakeApp);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/404. Page not found/i)).toBeInTheDocument();
    expect(await screen.findByText(/Вернуться на главную/i)).toBeInTheDocument();

  });

  it('should display page film detail', async() => {
    fetchFilm.mockReturnValue(Promise.resolve(film));
    render(fakeApp);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();

  });
});
