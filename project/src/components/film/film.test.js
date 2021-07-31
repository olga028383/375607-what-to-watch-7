import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Film from './film';

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

let fakeApp = null;
let history = null;

describe('Component: Film', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    fakeApp = (
      <Router history={history}>
        <Film film={film} />
      </Router>
    );
  });

  it('should display movie card', () => {
    render(fakeApp);

    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByAltText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
  });
});
