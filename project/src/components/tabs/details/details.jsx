import React from 'react';
import filmProp from '../../film/film.prop.js';
import {getLengthTimeFormat} from '../../../util.js';

function Details({film}) {
  const {director, starring, runTime, genre, released} = film;
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          {/*Как отобразить бр*/}
          <span className="film-card__details-value">{starring.map((data) =>  `${data} </br>`).join()}</span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getLengthTimeFormat(runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>

    </div>
  );
}

Details.propTypes = {
  film: filmProp,
};

export default Details;
