import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import PrivateRouteLogin from './private-route-login';
import configureStore from 'redux-mock-store';
import {AppRoute, AuthorizationStatus} from '../../../constants';

const mockStore = configureStore({});
let history;

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(AppRoute.LOGIN);
  });

  it('When the user is logged in should redirect to the home page from the login page', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRouteLogin
            exact
            path={AppRoute.LOGIN}
            render={() => (<h1>Page login</h1>)}
          />
          <Route exact path={AppRoute.ROOT}><h1>Page home</h1></Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Page home/i)).toBeInTheDocument();
    expect(screen.queryByText(/Page login/i)).not.toBeInTheDocument();
  });

  it('When the user is not logged in should not be redirected to the main page from the login page', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRouteLogin
            exact
            path={AppRoute.LOGIN}
            render={() => (<h1>Page login</h1>)}
          />
          <Route exact path={AppRoute.ROOT}><h1>Page home</h1></Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Page login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Page home/i)).not.toBeInTheDocument();

  });
});
