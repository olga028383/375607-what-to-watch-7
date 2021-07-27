import React from 'react';
import PropTypes from 'prop-types';
import Film from '../film/film';
import filmProp from '../film/film.prop.js';

function FilmList({count, films}) {

  return (
    <div className="catalog__films-list">
      {films.slice(0, count).map((film, id) => {
        const keyValue = `${id}-${film.posterImage}`;
        return <Film key={keyValue} film={film}/>;
      })}
    </div>
  );
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  count: PropTypes.number.isRequired,
};
export default FilmList;
