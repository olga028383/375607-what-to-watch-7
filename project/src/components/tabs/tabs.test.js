import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tabs from './tabs';

jest.mock('./reviews/reviews.jsx', () => {
  function Reviews() {
    return <>This is mock Reviews</>;
  }

  return {
    __esModule: true,
    default: Reviews,
  };
});

jest.mock('./details/details.jsx', () => {
  function Details() {
    return <>This is mock Details</>;
  }

  return {
    __esModule: true,
    default: Details,
  };
});

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
  isFavorite: true,
};

describe('Component: Tabs', () => {

  it('the component should render correctly', () => {
    render(<Tabs film={film}/>);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();

  });

  it('the overview tab must be active and the required content must be loaded', () => {
    const {container} = render(<Tabs film={film}/>);

    expect(container.querySelector('.film-nav__item--active a').textContent).toBe('Overview');
    expect(screen.getByText(/8.9/i)).toBeInTheDocument();
    expect(screen.getByText(/Very Good/i)).toBeInTheDocument();
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
  });

  it('should switch the reviews tab on click', () => {
    const {container} = render(<Tabs film={film}/>);

    userEvent.click(screen.getByText(/Review/i));
    expect(container.querySelector('.film-nav__item--active a').textContent).toBe('Reviews');
    expect(screen.getByText(/This is mock Reviews/i)).toBeInTheDocument();

  });

  it('should switch the details tab on click', () => {
    const {container} = render(<Tabs film={film}/>);

    userEvent.click(screen.getByText(/Details/i));
    expect(container.querySelector('.film-nav__item--active a').textContent).toBe('Details');
    expect(screen.getByText(/This is mock Details/i)).toBeInTheDocument();

  });
});

