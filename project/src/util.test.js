import {
  getLengthTimeFormat,
  getUnitTimeFormat,
  getFilterFilms,
  isCheckAuth,
  isValidateEmail,
  getLengthTimeVideoFormat,
  showRatingText,
  checkLengthReview
} from './util';
import {ALL_GENRES, AuthorizationStatus, Rating} from './constants';

const films = [{
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
}, {
  id: 2,
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
  genre: 'Thriller',
  released: 2014,
  isFavorite: false,
}];

describe('tests utility functions', () => {
  it('should return the time format in hours and minutes', () => {
    expect(getLengthTimeFormat(99)).toBe('1h 39m');
    expect(getLengthTimeFormat('')).toBe('');
  });

  it('should return the format of the number with or without 0', () => {
    expect(getUnitTimeFormat(99)).toBe('99');
    expect(getUnitTimeFormat(5)).toBe('05');
  });

  it('should return the time video format in hours and minutes and seconds', () => {
    expect(getLengthTimeVideoFormat(125)).toBe('- 02:05');
    expect(getLengthTimeVideoFormat(7300)).toBe('- 02:01:40');
    expect(getLengthTimeVideoFormat('')).toBe('');
  });

  it('gotta bring back the genre', () => {
    expect(getFilterFilms(ALL_GENRES, films)).toEqual(films);
    expect(getFilterFilms('Comedy', films)).toEqual([films[0]]);
    expect(getFilterFilms('Fantasy', films)).toEqual([]);
  });

  it('should return user status', () => {
    expect(isCheckAuth(AuthorizationStatus.AUTH)).toBe(true);
    expect(isCheckAuth(AuthorizationStatus.NO_AUTH)).toBe(false);
  });

  it('should return validity status email', () => {
    expect(isValidateEmail('test@mail.ru')).toBe(true);
    expect(isCheckAuth('testmail.ru')).toBe(false);
    expect(isCheckAuth('')).toBe(false);
    expect(isCheckAuth('test@mail')).toBe(false);
  });

  it('checks the validity of the length of the entered comment', () => {
    expect(checkLengthReview('test')).toBe(false);
  });

  it('Should display the user\'s rating', () => {
    expect(showRatingText(2)).toBe(Rating.BAD);
    expect(showRatingText(4)).toBe(Rating.NORMAL);
    expect(showRatingText(6)).toBe(Rating.GOOD);
    expect(showRatingText(9)).toBe(Rating.VERY_GOOD);
    expect(showRatingText(15)).toBe(Rating.AWESOME);
  });
});
