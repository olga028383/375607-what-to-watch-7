import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import PrivateRoute from './private-route';
import configureStore from 'redux-mock-store';
import {AppRoute, AuthorizationStatus} from '../../constants';


let fakeApp = null;
let history = null;
let store = null;

describe('Component: PrivateRoute', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <PrivateRoute path={AppRoute.ROOT} render={() => <h1>My List</h1>}/>
        </Router>
      </Provider>
    );
  });

  it('should display film list private route', () => {

    render(fakeApp);

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
  });
});
