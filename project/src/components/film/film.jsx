import React from 'react';
import {Link} from 'react-router-dom';

import filmProp from '../film/film.prop.js';

function Film(props) {
  const {film} = props;
  const {id, name, posterImage} = film;
  const pathLink = `/films/${id}`;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterImage} alt="Bohemian Rhapsody" width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={pathLink} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

Film.propTypes = {
  film: filmProp,
};

export default Film;
