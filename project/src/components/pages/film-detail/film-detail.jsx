import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import Loading from '../../loading/loading';
import FilmList from '../../film-list/film-list';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import User from '../../header/user/user';
import Tabs from '../../tabs/tabs';
import FilmInfo from './film-info/film-info';
import NotFound from '../../not-found/not-found';

import {fetchFilm, fetchComments, fetchSimilarFilms} from '../../../store/api-actions';

function FilmDetail({api}) {
  const params = useParams();

  const [data, setData] = useState({
    film: {},
    comments: [],
    similar: [],
    isLoading: false,
    isPage: true,
  });

  const {film, comments, similar, isLoading, isPage} = data;
  const {name, backgroundImage, posterImage} = film;

  useEffect(() => {

    Promise
      .all([
        fetchFilm(params.id, api),
        fetchComments(params.id, api),
        fetchSimilarFilms(params.id, api),
      ])
      .then(([filmData, commentsData, similarData]) => {
        setData({
          ...data,
          film: filmData,
          comments: commentsData,
          similar: similarData,
          isLoading: true,
        });
      })
      .catch(() => {
        setData({
          ...data,
          isPage: false,
        });
      });
  }, [params.id]);

  if (!isPage) {
    return (
      <NotFound/>
    );
  }

  if (!isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header className='page-header film-card__head'>
            <User/>
          </Header>

          <FilmInfo film={film}/>

        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">

              <Tabs film={film} comments={comments}/>

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={similar} count={similar.length}/>

        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  api: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  api: state.api,
});

export {FilmDetail};
export default connect(mapStateToProps, null)(FilmDetail);
