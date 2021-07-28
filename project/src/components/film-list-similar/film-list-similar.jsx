import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import FilmList from '../film-list/film-list';
import Loading from '../loading/loading';
import {fetchSimilarFilms} from '../../store/api-actions';
import {getApi} from '../../store/application/selectors';

function FilmListSimilar({setApi}) {
  const params = useParams();

  const [data, setData] = useState({
    similar: [],
    isLoading: false,
  });

  const {similar, isLoading} = data;

  useEffect(() => {
    fetchSimilarFilms(params.id, setApi)
      .then((similarData) => {
        setData({
          similar: similarData,
          isLoading: true,
        });
      });
  }, [params.id]);

  if (!isLoading) {
    return (
      <Loading/>
    );
  }

  return (

    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <FilmList films={similar} count={similar.length}/>

    </section>
  );
}


FilmListSimilar.propTypes = {
  setApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  setApi: getApi(state),
});

export {FilmListSimilar};
export default connect(mapStateToProps, null)(FilmListSimilar);
