import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

import filmProp from '../film/film.prop.js';

const generateList = (films) => Object.keys(films.reduce((accumulator, film) => {
  accumulator[film.genre] = true;
  return accumulator;
}, {'All genres': true}));

function GenreList(props) {
  const {films, genre, onChangeGenre} = props;
  return (
    <ul className="catalog__genres-list">

      {generateList(films).map((item, id) => (
        <li key={item} className={'catalog__genres-item' + ((item === genre) ? ' catalog__genres-item--active' : '')}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => {
            evt.preventDefault();
            onChangeGenre(item);
          }}
          >{item}
          </a>
        </li>
      ))}

    </ul>
  );
}

GenreList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  genre: PropTypes.string.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeGenre(data) {
    dispatch(ActionCreator.changeGenre(data));
  },
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
