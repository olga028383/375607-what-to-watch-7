import React from 'react';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import FormReview from '../../add-review/add-review';

import filmProp from '../../film/film.prop.js';
import Header from '../../header/header.jsx';
import User from '../../header/user/user';
import NotFound from '../../not-found/not-found';
import {getFilms} from '../../../store/data/selectors';

function Review({films}) {
  const params = useParams();
  const film = films.filter((currentFilm) => currentFilm.id === Number(params.id))[0];
  if (!film) {
    return (
      <NotFound/>
    );
  }

  const {id, name, posterImage, backgroundImage} = film;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="page-header">
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <User/>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <FormReview/>
      </div>

    </section>
  );
}


Review.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
});

export {Review};
export default connect(mapStateToProps, null)(Review);
