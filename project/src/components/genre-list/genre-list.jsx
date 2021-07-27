import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GenreItem from './genre-item/genre-item';
import filmProp from '../film/film.prop.js';
import {getFilms} from '../../store/data/selectors';

const allGenres = {'All genres': true};

const generateList = (films) => Object.keys(films.reduce((accumulator, film) => {
  accumulator[film.genre] = true;
  return accumulator;
}, allGenres));

function GenreList({films, onClickGenre}) {
  return (
    <ul className="catalog__genres-list">

      {generateList(films).map((item) => <GenreItem key={item} name={item} onClickGenre={onClickGenre}/>)}

    </ul>
  );
}

GenreList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  onClickGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
});

export {GenreList};
export default connect(mapStateToProps)(GenreList);

