import {MIN_TIME, ALL_GENRES, AuthorizationStatus, TEN, MIN_LENGTH_COMMENT, MAX_LENGTH_COMMENT, Ratings} from './constants';

const getLengthTimeFormat = (numeric) => {
  if (!numeric) {
    return '';
  }

  const minutes = numeric % MIN_TIME;
  const hours = (numeric - minutes) / MIN_TIME;

  let result = 0;
  if (hours > 0) {
    result = `${hours}h`;
  }
  if (minutes > 0) {
    result += (minutes <= 9) ? ` 0${minutes}m` : ` ${minutes}m`;
  }

  return result.trim();
};

const getUnitTimeFormat = (unit) => unit < TEN ? `0${unit}` : `${unit}`;

const getLengthTimeVideoFormat = (numeric) => {
  if (!numeric) {
    return '';
  }

  const hours = Math.floor(numeric / 3600);
  const minutes = Math.floor(numeric % 3600 / 60);
  const seconds = Math.floor(numeric % 3600 % 60);

  const hoursValue = getUnitTimeFormat(hours);
  const minutesValue = getUnitTimeFormat(minutes);
  const secondsValue = getUnitTimeFormat(seconds);

  return hours ? `- ${hoursValue}:${minutesValue}:${secondsValue}` : `- ${minutesValue}:${secondsValue}`;
};

const getFilterFilms = (genre, films) => {
  if (genre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};

const isCheckAuth = (authorizationStatus) => authorizationStatus === AuthorizationStatus.AUTH;

const isValidateEmail = (email) => /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email);

const checkLengthReview = (comment) => comment.length > MIN_LENGTH_COMMENT && comment.length <= MAX_LENGTH_COMMENT;

const showRatingText = (rating) => {
  if (rating > 0 && rating < 3) {
    return Ratings.BAD;
  } else if (rating >= 3 && rating < 5) {
    return Ratings.NORMAL;
  } else if (rating >= 5 && rating < 8) {
    return Ratings.GOOD;
  } else if (rating >= 8 && rating < 10) {
    return Ratings.VERY_GOOD;
  } else {
    return Ratings.AWESOME;
  }
};

export {
  getLengthTimeFormat,
  getFilterFilms,
  isCheckAuth,
  isValidateEmail,
  getLengthTimeVideoFormat,
  getUnitTimeFormat,
  checkLengthReview,
  showRatingText
};
