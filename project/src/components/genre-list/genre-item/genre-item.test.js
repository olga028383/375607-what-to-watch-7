import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import GenreItem from './genre-item';
import {ALL_GENRES, AuthorizationStatus} from '../../../constants';

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
const onClickGenre = jest.fn();
let fakeApp = null;
let store = null;

describe('Component: GenreItem', () => {
  beforeAll(() => {

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
      DATA: {isDataLoaded: true, films: [film], promo: {}},
      APPLICATION: {genre: ALL_GENRES, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <GenreItem name={'Comedy'} onClickGenre={onClickGenre}/>
      </Provider>
    );
  });

  it('should display genre item', () => {

    render(fakeApp);
    expect(screen.getByText(/Comedy/i)).toBeInTheDocument();

  });

  it('the click should be processed', () => {
    const {container} = render(fakeApp);

    expect(container.querySelector('.catalog__genres-item--active')).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Comedy/i));
    expect(onClickGenre).toHaveBeenCalled();

  });
});
