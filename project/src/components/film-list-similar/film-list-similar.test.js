import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import FilmListSimilar from './film-list-similar';
import {ALL_GENRES, AuthorizationStatus} from '../../constants';
import {fetchSimilarFilms} from '../../store/api-actions';

jest.mock('../../store/api-actions');

let fakeApp = null;
let history = null;
let store = null;

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
  isFavorite: true,
};

describe('Component: FilmListSimilar', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
      APPLICATION: {genre: ALL_GENRES, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <FilmListSimilar/>
        </Router>
      </Provider>
    );
  });

  it('there must be a correct render FilmListSimilar', async () => {
    fetchSimilarFilms.mockReturnValue(Promise.resolve([film]));
    render(fakeApp);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/More like this/i)).toBeInTheDocument();
    expect(await screen.findByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
  });
});
