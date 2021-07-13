import {MIN_TIME, ALL_GENRES, AuthorizationStatus} from './constants.js';


const getLengthTimeFormat = (numeric) => {
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

const getFilterFilms = (genre, films) => {
  if (genre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};

const isCheckAuth = (authorizationStatus) => authorizationStatus === AuthorizationStatus.AUTH;

const isValidateEmail = (email) => /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email);

export {getLengthTimeFormat, getFilterFilms, isCheckAuth, isValidateEmail};
