import React from 'react';
import {Link} from 'react-router-dom';
import FormReview from '../../add-review/add-review';

import filmProp from '../../film/film.prop.js';
import Header from '../../header/header.jsx';
import User from '../../header/user/user';

function Review(props) {
  const {film} = props;
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
  film: filmProp,
};

export default Review;
