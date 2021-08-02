import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import Review from './review';
import {ALL_GENRES, AppRoute, AuthorizationStatus} from '../../../constants';
import PrivateRouteTotal from '../../private-route/private-route-total/private-route-total';

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

let fakeApp = null;
let history = null;
let store = null;

describe('Component: Review', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    history.push('/films/1/review');

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {id: 1, email: 'katy@mail.ru', avatar: '', name: 'Katy', token: ''}},
      DATA: {isDataLoaded: true, films: [film], promo: {}},
      APPLICATION: {genre: ALL_GENRES, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <PrivateRouteTotal exact path={AppRoute.REVIEW} render={() => <Review/>}/>
          </Switch>
        </Router>
      </Provider>
    );
  });

  it('should display page review', () => {
    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
  });

  it('should display page review not found', () => {
    history.push('/films/2/review');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });


});
