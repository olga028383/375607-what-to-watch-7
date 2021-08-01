import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {AppRoute, AuthorizationStatus} from '../../../../constants';
import {logout} from '../../../../store/api-actions';
import UserInfo from './user-info';
import {ActionType} from '../../../../store/action';

jest.mock('../../../../store/api-actions');
let fakeApp = null;
let store = null;
let history = null;

describe('Component: UserInfo', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {id: 1, email: 'katy@mail.ru', avatar: '', name: 'Katy', token: ''}},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.MY_LIST}>
              <h1>My List</h1>
            </Route>
            <UserInfo/>
          </Switch>
        </Router>
      </Provider>
    );
  });

  it('should display user info', () => {
    render(fakeApp);

    expect(screen.getByText(/katy@mail.ru/i)).toBeInTheDocument();
  });

  it('clicking on the avatar should redirect to the list', () => {
    render(fakeApp);

    userEvent.click(screen.getByAltText(/User avatar/i));
    history.push(AppRoute.MY_LIST);
    expect(screen.getByText(/My List/i)).toBeInTheDocument();

  });

  it('click on the link to log out', () => {
    logout.mockReturnValue({
      type: ActionType.LOGOUT,
    });

    history.push(AppRoute.ROOT);
    render(fakeApp);

    userEvent.click(screen.getByText(/katy@mail.ru/i));
    expect(logout).toBeCalled();

  });
});
