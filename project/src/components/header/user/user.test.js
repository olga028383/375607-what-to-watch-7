import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import User from './user';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus} from '../../../constants';

let fakeApp = null;
let fakeAppWithUser = null;
let store = null;
let storeWithUser = null;
let history = null;

describe('Component: User', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    storeWithUser = createFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {id: 1, email: 'katy@mail.ru', avatar: '', name: 'Katy', token: ''},
      },
    });

    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH, user: {}},
    });

    fakeAppWithUser = (
      <Provider store={storeWithUser}>
        <Router history={history}>
          <User/>
        </Router>
      </Provider>
    );

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <User/>
        </Router>
      </Provider>
    );
  });

  it('should display user', () => {

    render(fakeAppWithUser);

    expect(screen.getByText(/katy@mail.ru/i)).toBeInTheDocument();
  });

  it('should not display user', () => {

    render(fakeApp);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
