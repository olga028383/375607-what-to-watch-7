import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import filmProp from '../../../film/film.prop.js';
import {AppRoute} from '../../../../constants';
import {isCheckAuth} from '../../../../util';

function FilmInfo({film, authorizationStatus}) {
  const history = useHistory();
  const {id, name, genre, released} = film;

  return(
    <div className="film-card__wrap">
      <div className="film-card__desc">
        <h2 className="film-card__title">{name}</h2>
        <p className="film-card__meta">
          <span className="film-card__genre">{genre}</span>
          <span className="film-card__year">{released}</span>
        </p>

        <div className="film-card__buttons">
          <button className="btn btn--play film-card__button" type="button">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <button className="btn btn--list film-card__button" type="button" onClick={() => history.push(AppRoute.MY_LIST)}>
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>
            <span>My list</span>
          </button>
          {isCheckAuth(authorizationStatus) && <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
        </div>
      </div>
    </div>
  );
}

FilmInfo.propTypes = {
  film: filmProp,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {FilmInfo};
export default connect(mapStateToProps, null)(FilmInfo);
