import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import Player from './player';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import {ALL_GENRES, AppRoute, AuthorizationStatus} from '../../../constants';

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

let history = null;
let store = null;

describe('Component: Player', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.requestFullscreen = jest.fn();
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {id: 1, email: 'katy@mail.ru', avatar: '', name: 'Katy', token: ''}},
      DATA: {isDataLoaded: true, films: [film], promo: {}},
      APPLICATION: {genre: ALL_GENRES, api: jest.fn()},
    });

  });

  it('should display page player', () => {
    history.push('/player/1');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.PLAYER} render={() => <Player/>}/>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
  });

  it('should display page player not found', () => {
    history.push('/player/2');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.PLAYER} render={() => <Player/>}/>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('when you click on the exit button, a redirect to the previous page should occur', () => {
    history.push('/player/1');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>Home</h1>
            </Route>
            <Route exact path={AppRoute.PLAYER} render={() => <Player/>}/>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/this is the previous page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Exit/i));
    history.push(AppRoute.ROOT);
    expect(screen.queryByText(/Home/i)).toBeInTheDocument();
    expect(screen.queryByText(/Exit/i)).not.toBeInTheDocument();
  });

  it('should expand the player to full screen', () => {
    history.push('/player/1');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.PLAYER} render={() => <Player/>}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('full-screen'));
    expect(document.fullscreenElement).not.toBe(null);
  });

  it('by clicking on the button play should start playback', () => {
    history.push('/player/1');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.PLAYER} render={() => <Player/>}/>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('pause')).toBe(null);
    userEvent.click(screen.getByTestId('play'));
    expect(screen.getByTestId('pause')).toBeInTheDocument();
  });

  it('by clicking on the button pause should start playback', () => {
    history.push('/player/1');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.PLAYER} render={() => <Player/>}/>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('pause')).toBe(null);
    userEvent.click(screen.getByTestId('play'));
    expect(screen.getByTestId('pause')).toBeInTheDocument();
    expect(screen.queryByTestId('play')).toBe(null);
    userEvent.click(screen.getByTestId('pause'));
    expect(screen.getByTestId('play')).toBeInTheDocument();
  });

  it('shows the bootloader before starting playback', () => {
    history.push('/player/1');
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.PLAYER} render={() => <Player/>}/>
        </Router>
      </Provider>,
    );

    fireEvent(container.querySelector('video'), new Event('canplay'));
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('play'));
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
