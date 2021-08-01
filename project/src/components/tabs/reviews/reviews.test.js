import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import Reviews from './reviews';
import {ALL_GENRES, AuthorizationStatus} from '../../../constants';
import {fetchComments} from '../../../store/api-actions';
jest.mock('../../../store/api-actions');

let fakeApp = null;
let history = null;
let store = null;

const reviews = [{
  id: 1,
  userId: 4,
  userName: 'Kate Muir',
  rating: 8.9,
  comment: 'Discerning travellers.',
  date: '2019-05-08T14:13:56.569Z',
},{
  id: 2,
  userId: 5,
  userName: 'Donald',
  rating: 7.0,
  comment: 'Discerning travellers.',
  date: '2019-05-08T14:13:56.569Z',
}];

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
          <Reviews/>
        </Router>
      </Provider>
    );
  });

  it('there must be a correct render FilmListSimilar', async () => {
    fetchComments.mockReturnValue(Promise.resolve(reviews));
    render(fakeApp);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/Kate Muir/i)).toBeInTheDocument();
    expect(await screen.findByText(/8.9/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Discerning travellers./i)).toHaveLength(2);
  });
});
