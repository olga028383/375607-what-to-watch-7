const AppRoute = {
  LOGIN: '/login',
  ROOT: '/',
  MY_LIST: '/mylist',
  FILM_DETAIL: '/films/:id/(details|reviews)?',
  REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
};

const TabsName = {
  REVIEWS: 'reviews',
  DETAILS: 'details',
};

const FilmsCount = {
  LIST: 19,
  HOME: 8,
  SIMILAR: 4,
};

const Ratings = {
  BAD: 'Bad',
  NORMAL: 'Normal',
  GOOD: 'Good',
  VERY_GOOD: 'Very Good',
  AWESOME: 'Awesome',
};

const ApiRoute = {
  FILMS: '/films',
};

const COUNT_RATING = 10;

const START_LOAD_VIDEO = 1000;

const ALL_GENRES = 'All genres';

const MIN_TIME = 60;

export {AppRoute, FilmsCount, COUNT_RATING, START_LOAD_VIDEO, TabsName, Ratings, ALL_GENRES, MIN_TIME, ApiRoute};
