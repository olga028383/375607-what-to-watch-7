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

const COUNT_RATING = 10;

const START_LOAD_VIDEO = 1000;

export {AppRoute, FilmsCount, COUNT_RATING, START_LOAD_VIDEO, TabsName};
