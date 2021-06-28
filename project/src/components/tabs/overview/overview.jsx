import React from 'react';
import filmProp from '../../film/film.prop.js';

import {Ratings} from '../../../constants.js';

const showRatingText = (rating) =>{
  if(rating > 0 && rating < 3){
    return Ratings.BAD;
  }else if(rating >=3 && rating < 5){
    return Ratings.NORMAL;
  }else if(rating >=5 && rating < 8){
    return Ratings.GOOD;
  }else if(rating >=8 && rating < 10){
    return Ratings.VERY_GOOD;
  }else{
    return Ratings.AWESOME;
  }
};

function Overview({film}) {
  const {rating, description, director, starring, scoresCount} = film;
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
