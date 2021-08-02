import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Form from './form';
import {login} from '../../../../store/api-actions';
import {AuthorizationStatus} from '../../../../constants';
import {ActionType} from '../../../../store/action';

let fakeApp = null;
let store = null;

jest.mock('../../../../store/api-actions');

const middlewares = [thunk];

describe('Component: Form', () => {
  beforeAll(() => {

    const createFakeStore = configureStore(middlewares);
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH, user: {}},
      APPLICATION: {genre: '', api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <Form/>
      </Provider>
    );
  });

  it('there must be a correct renderer', () => {
    render(fakeApp);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

  });

  it('checks that the input field for the email and password is active and the entered data is displayed', () => {
    render(fakeApp);

    userEvent.type(screen.getByTestId('email'), 'test');
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).not.toBeDisabled();

    userEvent.type(screen.getByTestId('password'), 'password');
    expect(screen.getByDisplayValue(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).not.toBeDisabled();
  });

  it('will test the form submission', () => {
    login.mockReturnValue({
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: 'AUTH',
      user: {id: 1},
    });

    render(fakeApp);

    userEvent.type(screen.getByTestId('email'), 'test');
    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), 'password');
    userEvent.click(screen.getByText(/Sign in/i));
    expect(login).toBeCalled();

  });

});

