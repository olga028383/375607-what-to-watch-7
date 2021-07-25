import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeGenre} from '../../../store/action';
import {getGenre} from '../../../store/application/selectors';

function GenreItem({genre, onChangeGenre, onClickGenre, name}) {
  const activeItem = (name === genre) && 'catalog__genres-item--active';
  return (
    <li className={`catalog__genres-item ${activeItem}`}>
      <a href="#" className="catalog__genres-link" onClick={(evt) => {
        evt.preventDefault();
        onChangeGenre(name);
        onClickGenre();
      }}
      >{name}
      </a>
    </li>
  );
}

GenreItem.propTypes = {
  genre: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
  onClickGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeGenre(data) {
    dispatch(changeGenre(data));
  },
});

export {GenreItem};
export default connect(mapStateToProps, mapDispatchToProps)(GenreItem);
