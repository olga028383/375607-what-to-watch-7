import React from 'react';
import filmProp from '../../film/film.prop.js';

const showRatingText = (rating) =>{
  if(rating > 0 && rating < 3){
    return 'Bad';
  }else if(rating >=3 && rating < 5){
    return 'Normal';
  }else if(rating >=5 && rating < 8){
    return 'Good';
  }else if(rating >=8 && rating < 10){
    return 'Very good';
  }else{
    return 'Awesome';
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
