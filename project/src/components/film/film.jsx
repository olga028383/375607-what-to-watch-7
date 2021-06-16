import React from 'react';
import {Link} from 'react-router-dom';

import filmProp from '../film/film.prop.js';

function Film(props) {
  const {film} = props;
  const pathLink = `/films/${film.id}`;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.posterImage} alt="Bohemian Rhapsody" width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={pathLink} className="small-film-card__link">{film.name}</Link>
      </h3>
    </article>
  );
}

filmProp.propTypes = {
  film: filmProp
};

export default Film;
