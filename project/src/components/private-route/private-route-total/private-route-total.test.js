import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import PrivateRouteTotal from './private-route-total';
import configureStore from 'redux-mock-store';
import {AppRoute, AuthorizationStatus} from '../../../constants';

const mockStore = configureStore({});
let history;

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(AppRoute.MY_LIST);
  });

  it('no redirects should occur if the user is logged in', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRouteTotal
            exact
            path={AppRoute.MY_LIST}
            render={() => (<h1>My List</h1>)}
          />
          <Route exact path={AppRoute.LOGIN}><h1>Sign In</h1></Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
  });

  it('there should be no redirection to the login page if the user is not logged in', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH, user: {}},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRouteTotal
            exact
            path={AppRoute.MY_LIST}
            render={() => (<h1>My List</h1>)}
          />
          <Route exact path={AppRoute.LOGIN}><h1>Sign In</h1></Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
