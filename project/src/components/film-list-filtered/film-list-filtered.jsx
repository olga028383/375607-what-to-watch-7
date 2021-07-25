import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GenreList from '../genre-list/genre-list';
import MoreButton from '../more-button/more-button';
import FilmList from '../film-list/film-list';

import filmProp from '../film/film.prop.js';
import {FilmsCount} from '../../constants.js';
import {getFilms} from '../../store/data/selectors';
import {getGenre} from '../../store/application/selectors';
import {getFilterFilms} from '../../util';

function FilmListFiltered({films, genre}) {
  const [countFilms, setCountFilms] = useState(FilmsCount.HOME);
  const filmsFiltered = getFilterFilms(genre, films);

  const onClickButton = () => {
    setCountFilms(countFilms + FilmsCount.HOME);
  };

  const onClickGenre = useCallback(() => {
    setCountFilms(FilmsCount.HOME);
  }, []);

  return (

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenreList onClickGenre={onClickGenre}/>

      <FilmList films={filmsFiltered} count={countFilms}/>

      {countFilms < filmsFiltered.length && <MoreButton onClickButton={onClickButton}/>}

    </section>

  );
}

FilmListFiltered.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  genre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  genre: getGenre(state),
});

export {FilmListFiltered};
export default connect(mapStateToProps)(FilmListFiltered);
