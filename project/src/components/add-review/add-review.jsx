import React, {useState} from 'react';
import RatingField from './rating-field/rating-field.jsx';

function FormReview() {
  const [data, setData] = useState({
    rating: 0,
    comment: '',
  });

  const {rating, comment} = data;

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleTextChange(evt) {
    setData({
      ...data,
      comment: evt.target.value,
    });
  }

  function onRatingChange(evt) {
    setData({
      ...data,
      rating: Number(evt.target.value),
    });
  }

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">

          {new Array(10).fill(null).map((element, index) => {
            const keyValue = `${index}-${element}`;
            return <RatingField index={10 - index} value={rating} handleRatingChange={onRatingChange} key={keyValue}/>;
          })}

        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" value={comment} id="review-text" onChange={handleTextChange} placeholder="Review text"></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default FormReview;
