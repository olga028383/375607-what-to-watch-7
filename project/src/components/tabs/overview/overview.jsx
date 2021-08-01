import React from 'react';
import filmProp from '../../film/film.prop.js';
import {showRatingText} from '../../../util';

function Overview({film}) {
  const {rating, description, director, starring = [], scoresCount} = film;
  return (
    <React.Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{showRatingText(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {description}
        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {starring.join(', ')}</strong>
        </p>
      </div>
    </React.Fragment>
  );
}

Overview.propTypes = {
  film: filmProp,
};
export default Overview;
