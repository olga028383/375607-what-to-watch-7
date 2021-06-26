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
  DETAILS: 'details'
};

const COUNT_FILMS_LIST = 19;

const COUNT_RATING = 10;

const START_LOAD_VIDEO = 1000;

export {AppRoute, COUNT_FILMS_LIST, COUNT_RATING, START_LOAD_VIDEO, TabsName};
