import React from 'react';
import {connect} from 'react-redux';

import Header from '../../../header/header.jsx';
import User from '../../../header/user/user';
import PlayButton from '../../../play-button/play-button';
import FavoriteButton from '../../../favorite-button/favorite-button';

import filmProp from '../../../film/film.prop.js';
import {getFilmPromo} from '../../../../store/data/selectors';

function PromoFilm({promo}) {
  const {id, name, genre, date, posterImage, backgroundImage} = promo;
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>
      <h1 className="visually-hidden">WTW</h1>

      <Header className='page-header film-card__head'>
        <User/>
      </Header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={name} width="218" height="327"/>
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{date}</span>
            </p>

            <div className="film-card__buttons">
              <PlayButton filmId={id}/>

              <FavoriteButton film={promo} isPromo />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

PromoFilm.propTypes = {
  promo: filmProp,
};

const mapStateToProps = (state) => ({
  promo: getFilmPromo(state),
});

export {PromoFilm};
export default connect(mapStateToProps)(PromoFilm);
