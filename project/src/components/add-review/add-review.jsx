import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import RatingField from './rating-field/rating-field.jsx';
import {sendComment} from '../../store/api-actions';
import {redirect} from '../../store/action';
import {COUNT_RATING, ApiRoute} from '../../constants.js';
import {getActionApi} from '../../store/application/selectors';
import {checkLengthReview} from '../../util';

const MAX_SHOW_TIME_SERVER_ERROR = 2000;

const ErrorsForm = {
  COMMENT: 'Длина комментария минимум 50 символов и максимум 400',
  SERVER: 'Произошла ошибка отправки данных, пожалуйста, попробуйте отправить еще раз через некоторое время',
};

function FormReview({getApi, onRedirectFilm}) {
  const params = useParams();

  const [data, setData] = useState({
    rating: 0,
    comment: '',
    commentError: false,
    validate: false,
    serverError: false,
  });

  const {rating, comment, commentError, validate, serverError} = data;

  useEffect(() => {
    setTimeout(() => {
      if (serverError) {
        setData({
          ...data,
          serverError: false,
        });
      }
    }, MAX_SHOW_TIME_SERVER_ERROR);

  }, [serverError]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!validate) {
      return;
    }

    sendComment(rating, comment, params.id, getApi)
      .then(() => onRedirectFilm(`${ApiRoute.FILMS}/${params.id}`))
      .catch(() => {
        setData({
          ...data,
          serverError: true,
        });
      });
  };

  const handleTextChange = (evt) => {
    const currentData = {};

    currentData['commentError'] = !checkLengthReview(comment);
    currentData['validate'] = checkLengthReview(comment) && rating;

    setData({
      ...data,
      comment: evt.target.value,
      ...currentData,
    });

  };

  const onRatingChange = (evt) => {

    const currentData = {};
    if (checkLengthReview(comment)) {
      currentData['validate'] = true;
    }

    setData({
      ...data,
      rating: Number(evt.target.value),
      ...currentData,
    });

  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">

          {new Array(COUNT_RATING).fill(null).map((element, index) => {
            const keyValue = `${index}-${element}`;
            return <RatingField index={COUNT_RATING - index} value={rating} handleRatingChange={onRatingChange} key={keyValue}/>;
          })}

        </div>
      </div>
      {commentError && <div className="error">{ErrorsForm.COMMENT}</div>}
      {serverError && <div className="error">{ErrorsForm.SERVER}</div>}

      <div className="add-review__text">
        <textarea className="add-review__textarea" data-testid="textarea" name="review-text" value={comment} id="review-text" onChange={handleTextChange} placeholder="Review text"></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!validate}>Post</button>
        </div>

      </div>
    </form>
  );
}

FormReview.propTypes = {
  getApi: PropTypes.func.isRequired,
  onRedirectFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getApi: getActionApi(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRedirectFilm(data) {
    dispatch(redirect(data));
  },
});

export {FormReview};
export default connect(mapStateToProps, mapDispatchToProps)(FormReview);
