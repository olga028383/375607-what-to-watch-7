import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {ALL_GENRES, AuthorizationStatus} from '../../../../constants';
import UserInfo from './user-info';

let fakeApp = null;
let store = null;
let history = null;

describe('Component: UserInfo', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {id: 1, email: 'katy@mail.ru', avatar: '', name: 'Katy', token: ''}},
      DATA: {isDataLoaded: true, films: [], promo: {}},
      APPLICATION: {genre: ALL_GENRES, api: () => {}},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <UserInfo/>
        </Router>
      </Provider>
    );
  });

  it('should display user info', () => {

    render(fakeApp);

    expect(screen.getByText(/katy@mail.ru/i)).toBeInTheDocument();
  });

});
