import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import Film from './film';
import {AppRoute} from '../../constants';

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

jest.mock('./video-player/video-player', () => {
  function VideoPlayer() {
    return <>Video Player</>;
  }

  return {
    __esModule: true,
    default: VideoPlayer,
  };
});

let fakeApp = null;
let history = null;

describe('Component: Film', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    fakeApp = (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.FILM_DETAIL.replace(':id', 1)}>
            <h1>Detailed card</h1>
          </Route>
          <Film film={film}/>
        </Switch>
      </Router>
    );
  });

  it('should display movie card', () => {
    const {container} = render(fakeApp);

    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByAltText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(container.querySelector('img')).toBeInTheDocument();
    expect(screen.queryByText(/Video Player/i)).not.toBeInTheDocument();

  });

  it('video should be displayed video on hover', () => {
    const {container} = render(fakeApp);

    userEvent.hover(container.querySelector('article'));
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(screen.getByText(/Video Player/i)).toBeInTheDocument();

    userEvent.unhover(container.querySelector('article'));
    expect(container.querySelector('img')).toBeInTheDocument();
    expect(screen.queryByText(/Video Player/i)).not.toBeInTheDocument();
  });

  it('clicking on the link should redirect to the detailed card', () => {
    render(fakeApp);
    userEvent.click(screen.getByText(/The Grand Budapest Hotel/i));
    expect(screen.getByText(/Detailed card/i)).toBeInTheDocument();
  });
});
