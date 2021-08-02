const AppRoute = {
  LOGIN: '/login',
  ROOT: '/',
  MY_LIST: '/mylist',
  FILM_DETAIL: '/films/:id',
  REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
};

const TabName = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

const FilmCount = {
  LIST: 19,
  HOME: 8,
  SIMILAR: 4,
};

const Rating = {
  BAD: 'Bad',
  NORMAL: 'Normal',
  GOOD: 'Good',
  VERY_GOOD: 'Very Good',
  AWESOME: 'Awesome',
};

const ApiRoute = {
  FILMS: '/films',
  FILM_PROMO: '/promo',
  LOGIN: '/login',
  LOGOUT: '/logout',
  COMMENTS: '/comments',
  SIMILAR: '/similar',
  FAVORITE: '/favorite',
};

const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

const Comment = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 400,
};
const COUNT_RATING = 10;

const START_LOAD_VIDEO = 1000;

const ALL_GENRES = 'All genres';

const MIN_TIME = 60;

const TEN = 10;

export {
  AppRoute,
  FilmCount,
  COUNT_RATING,
  START_LOAD_VIDEO,
  TabName,
  Rating,
  ALL_GENRES,
  MIN_TIME,
  ApiRoute,
  AuthorizationStatus,
  TEN,
  Comment
};
