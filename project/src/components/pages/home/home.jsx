import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GenreList from '../../genre-list/genre-list';
import FilmList from '../../film-list/film-list';
import MoreButton from '../../more-button/more-button';
import Footer from '../../footer/footer.jsx';

import {FilmsCount} from '../../../constants.js';
import {getFilterFilms} from '../../../util.js';

import filmProp from '../../film/film.prop.js';

function Home({promo, films, currentFilter}) {
  const filmsFiltered = getFilterFilms(currentFilter, films);
  const [countFilms, setCountFilms] = useState(FilmsCount.HOME);
  const {name, genre, date, posterImage} = promo;

  const onClickButton = () => {
    setCountFilms(countFilms + FilmsCount.HOME);
  };

  const onClickGenre = () => {
    setCountFilms(FilmsCount.HOME);
  };

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>
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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>


          <GenreList films={films} onClickGenre={onClickGenre}/>

          <FilmList films={filmsFiltered} count={countFilms}/>

          {countFilms < filmsFiltered.length && <MoreButton onClickButton={onClickButton}/>}

        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}

Home.propTypes = {
  promo: filmProp,
  films: PropTypes.arrayOf(filmProp).isRequired,
  currentFilter: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentFilter: state.genre,
});

export {Home};
export default connect(mapStateToProps)(Home);
