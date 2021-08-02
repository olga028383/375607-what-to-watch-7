import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import FilmList from '../film-list/film-list';
import Loading from '../loading/loading';
import {fetchSimilarFilms} from '../../store/api-actions';
import {getActionApi} from '../../store/application/selectors';

function FilmListSimilar({getApi}) {
  const params = useParams();

  const [data, setData] = useState({
    similar: [],
    isLoading: false,
  });

  const {similar, isLoading} = data;

  useEffect(() => {
    fetchSimilarFilms(params.id, getApi)
      .then((similarData) => {
        setData({
          similar: similarData,
          isLoading: true,
        });
      });

    return () => {
      setData({
        similar: [],
        isLoading: false,
      });
    };
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
  getApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getApi: getActionApi(state),
});

export {FilmListSimilar};
export default connect(mapStateToProps, null)(FilmListSimilar);
