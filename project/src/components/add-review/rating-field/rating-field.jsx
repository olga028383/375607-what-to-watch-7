import React from 'react';
import PropTypes from 'prop-types';

function RatingField(props) {
  const {index, value, handleRatingChange} = props;

  return (
    <React.Fragment>
      <input className="rating__input" id={`star-${index}`} type="radio" name="rating" value={index} checked={value === index} onChange={handleRatingChange}/>
      <label className="rating__label" htmlFor={`star-${index}`}>Rating {index}</label>
    </React.Fragment>
  );
}

RatingField.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
};

export default RatingField;
