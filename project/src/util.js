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

const getUnitTimeFormat = (unit) => unit < 10 ? `0${unit}` : unit;

const getLengthTimeVideoFormat = (numeric) => {
  const hours = Math.floor(numeric / (MIN_TIME * MIN_TIME));
  const minutes = Math.floor(numeric / MIN_TIME);
  const seconds = Math.floor(numeric - minutes * 60);

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

export {getLengthTimeFormat, getFilterFilms, isCheckAuth, isValidateEmail, getLengthTimeVideoFormat};
