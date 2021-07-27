import React from 'react';

import PromoFilm from './promo-film/promo-film';
import FilmListFiltered from '../../film-list-filtered/film-list-filtered';

import Footer from '../../footer/footer.jsx';

function Home() {
  return (
    <React.Fragment>

      <PromoFilm />

      <div className="page-content">

        {<FilmListFiltered/>}

        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default Home;
