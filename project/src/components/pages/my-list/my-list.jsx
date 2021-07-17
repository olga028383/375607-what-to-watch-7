import React from 'react';
import PropTypes from 'prop-types';

import FilmList from '../../film-list/film-list';
import Header from '../../header/header.jsx';
import User from '../../header/user/user';
import Footer from '../../footer/footer.jsx';

import filmProp from '../../film/film.prop.js';

function MyList({films}) {

  return (
    <div className="user-page">
      <Header className='page-header user-page__head'>
        <h1 className="page-title user-page__title">My list</h1>
        <User />
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={films} count={films.length}/>

      </section>

      <Footer/>
    </div>);
}

MyList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
};

export default MyList;
