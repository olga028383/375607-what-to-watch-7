import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import AddReview from './add-review';
import {ALL_GENRES, ApiRoute, AppRoute, AuthorizationStatus} from '../../constants';
import {sendComment} from '../../store/api-actions';

jest.mock('../../store/api-actions');

let fakeApp = null;
let history = null;
let store = null;
const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

describe('Component: AddReview', () => {
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
          <Switch>
            <Route exact path={AppRoute.FILM_DETAIL}>
              <h1>Film detail</h1>
            </Route>
            <AddReview/>
          </Switch>
        </Router>
      </Provider>
    );
  });

  it('there must be a correct render', () => {

    render(fakeApp);

    expect(screen.getAllByText(/Rating/i)).toHaveLength(10);
    screen.getAllByText(/Rating/i).forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();

  });

  it('checking the input logic textarea', () => {
    render(fakeApp);

    userEvent.type(screen.getByTestId('textarea'), 'test');
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/Длина комментария минимум 50 символов и максимум 400/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('textarea'), text);
    expect(screen.queryByText(/Длина комментария минимум 50 символов и максимум 400/i)).not.toBeInTheDocument();
  });

  it('checking the input logic radio', () => {
    render(fakeApp);

    userEvent.click(screen.getByDisplayValue(1));
    expect(screen.getByDisplayValue(1)).toBeChecked();
  });

  it('checking the input logic button', () => {
    render(fakeApp);

    expect(screen.getByText(/Post/i)).toBeDisabled();

    userEvent.type(screen.getByTestId('textarea'), text);
    userEvent.click(screen.getByDisplayValue(1));

    expect(screen.getByText(/Post/i)).not.toBeDisabled();

    userEvent.type(screen.getByTestId('textarea'), text);
    expect(screen.getByText(/Post/i)).toBeDisabled();

  });

  it('validation of sending input logic and the promise is resolve', async () => {
    sendComment.mockReturnValue(Promise.resolve());
    render(fakeApp);

    userEvent.type(screen.getByTestId('textarea'), text);
    userEvent.click(screen.getByDisplayValue(1));
    userEvent.click(screen.getByText(/Post/i));

    expect(sendComment).toHaveBeenCalledTimes(1);

    history.push(`${ApiRoute.FILMS}/1`);
    expect(screen.getByText(/Film detail/i)).toBeInTheDocument();

  });

  it('validation of sending input logic and the promise is reject', async () => {
    history.push(AppRoute.REVIEW);
    sendComment.mockReturnValue(Promise.reject());
    render(fakeApp);

    userEvent.type(screen.getByTestId('textarea'), text);
    userEvent.click(screen.getByDisplayValue(1));
    userEvent.click(screen.getByText(/Post/i));

    await waitFor(() => expect(sendComment).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Произошла ошибка отправки данных, пожалуйста, попробуйте отправить еще раз через некоторое время/i)).toBeInTheDocument();

  });

});
