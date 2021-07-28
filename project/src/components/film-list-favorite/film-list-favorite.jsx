import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import FilmList from '../film-list/film-list';
import Loading from '../loading/loading';
import {fetchFavoriteFilms} from '../../store/api-actions';
import {getApi} from '../../store/application/selectors';

function FilmLisFavorite({setApi}) {

  const [data, setData] = useState({
    favorite: [],
    isLoading: false,
  });

  const {favorite, isLoading} = data;

  useEffect(() => {
    fetchFavoriteFilms(setApi)
      .then((favoriteData) => {

        setData({
          favorite: favoriteData,
          isLoading: true,
        });
      });
  }, []);

  if (!isLoading) {
    return (
      <Loading/>
    );
  }

  return (

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <FilmList films={favorite} count={favorite.length}/>

    </section>
  );
}


FilmLisFavorite.propTypes = {
  setApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  setApi: getApi(state),
});

export {FilmLisFavorite};
export default connect(mapStateToProps, null)(FilmLisFavorite);
