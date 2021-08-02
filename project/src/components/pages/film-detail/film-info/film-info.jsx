import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import PlayButton from '../../../play-button/play-button';
import FavoriteButton from '../../../favorite-button/favorite-button';
import filmProp from '../../../film/film.prop.js';
import {isCheckAuth} from '../../../../util';
import {getAuthorizationStatus} from '../../../../store/user/selectors';

function FilmInfo({film, authorizationStatus, onSetFilm}) {
  const {id, name, genre, released, isFavorite} = film;

  return (
    <div className="film-card__wrap">
      <div className="film-card__desc">
        <h2 className="film-card__title">{name}</h2>
        <p className="film-card__meta">
          <span className="film-card__genre">{genre}</span>
          <span className="film-card__year">{released}</span>
        </p>

        <div className="film-card__buttons">

          <PlayButton filmId={id}/>

          <FavoriteButton film={film} isFavorite={isFavorite} setFilm={onSetFilm}/>

          {isCheckAuth(authorizationStatus) &&
          <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
        </div>
      </div>
    </div>
  );
}

FilmInfo.propTypes = {
  film: filmProp,
  onSetFilm: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {FilmInfo};
export default connect(mapStateToProps, null)(FilmInfo);
