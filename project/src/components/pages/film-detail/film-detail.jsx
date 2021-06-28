import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

import FilmList from '../../film-list/film-list';
import Footer from '../../footer/footer.jsx';
import Tabs from '../../tabs/tabs.jsx';

import {FilmsCount} from '../../../constants.js';

import filmProp from '../../film/film.prop.js';
import reviewProp from '../../review/review.prop.js';

const getSimilarFilms = (films, filmCurrent) => films.filter((film) => filmCurrent.genre === film.genre);

function FilmDetail({films, comments}) {
  const params = useParams();
  const filmCurrent = films.find((film) => film.id === Number(params.id));
  const {id, name, genre, released, backgroundImage, posterImage} = filmCurrent;

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
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
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">

              <Tabs film={filmCurrent} comments={comments}/>

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={getSimilarFilms(films, filmCurrent)} count={FilmsCount.SIMILAR}/>

        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  comments: PropTypes.arrayOf(reviewProp).isRequired,
};

export default FilmDetail;
