import React from 'react';

import FilmListFavorite from '../../film-list-favorite/film-list-favorite';
import Header from '../../header/header.jsx';
import User from '../../header/user/user';
import Footer from '../../footer/footer.jsx';

function MyList() {

  return (
    <div className="user-page">
      <Header className='page-header user-page__head'>
        <h1 className="page-title user-page__title">My list</h1>
        <User/>
      </Header>

      <FilmListFavorite/>

      <Footer/>
    </div>);
}

export default MyList;
