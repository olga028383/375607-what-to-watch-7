import React from 'react';
import PropTypes from 'prop-types';

function MoreButton({onClickButton}) {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClickButton}>Show more</button>
    </div>
  );
}

MoreButton.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default MoreButton;
