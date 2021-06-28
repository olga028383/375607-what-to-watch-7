import React from 'react';
import reviewProp from '../review/review.prop.js';

import {getDataReviewFormat} from '../../lib.js';

function Review({review}) {
  const {comment, userName, rating, date} = review;
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time className="review__date" dateTime={getDataReviewFormat(date, 'YYYY-MM-DD')}>{getDataReviewFormat(date, 'MMMM DD, YYYY')}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

Review.propTypes = {
  review: reviewProp,
};

export default Review;
