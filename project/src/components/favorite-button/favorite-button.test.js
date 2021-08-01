import React from 'react';
import {render, screen, rerender} from '@testing-library/react';
import FavoriteButton from './favorite-button';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {ALL_GENRES, AuthorizationStatus} from '../../constants';
import {addFavoriteFilm} from '../../store/api-actions';

jest.mock('../../store/api-actions');
const createFakeStore = configureStore({});
let store = null;
let fakeApp = null;
let onSetFilm = jest.fn();

describe('Component: FavoriteButton', () => {
  beforeAll(() => {
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

    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
      DATA: {isDataLoaded: true, films: [film], promo: film},
      APPLICATION: {genre: ALL_GENRES, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <FavoriteButton film={film} isPromo onSetFilm={onSetFilm}/>
      </Provider>
    );
  });

  it('should display favorite button', () => {

    addFavoriteFilm.mockReturnValue(Promise.resolve());

    const {rerender} = render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.queryByTestId('in-list')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

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

    const store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
      DATA: {isDataLoaded: true, films: [film], promo: {}},
      APPLICATION: {genre: ALL_GENRES, api: jest.fn()},
    });

    rerender(<Provider store={store}>
      <FavoriteButton film={film} isPromo onSetFilm={onSetFilm}/>
    </Provider>);

    expect(screen.getByTestId('in-list')).toBeInTheDocument();
    expect(screen.queryByTestId('add')).not.toBeInTheDocument();
  });
});
