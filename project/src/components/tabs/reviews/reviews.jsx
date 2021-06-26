import React from 'react';
import PropTypes from 'prop-types';

import Review  from '../../review/review';
import reviewProp  from '../../review/review.prop.js';

function Reviews({comments}) {
  const countComments = Math.ceil(comments.length / 2);

  return (
    <div className="film-card__reviews film-card__row">

        <div className="film-card__reviews-col">
          {comments.slice(0, countComments).map((comment, id) => <Review key={`${comment.id}-comment`} review={comment}/>)}
        </div>

        <div className="film-card__reviews-col">
          {comments.slice(countComments).map((comment) => <Review key={`${comment.id}-comment`} review={comment}/>)}
        </div>
    </div>
  );
}

Reviews.propTypes = {
  comments: PropTypes.arrayOf(reviewProp).isRequired,
};

export default Reviews;
