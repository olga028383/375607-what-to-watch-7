import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import Loading from '../../loading/loading';
import FilmListSimilar from '../../film-list-similar/film-list-similar';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import User from '../../header/user/user';
import Tabs from '../../tabs/tabs';
import FilmInfo from './film-info/film-info';
import NotFound from '../../not-found/not-found';

import {fetchFilm} from '../../../store/api-actions';
import {getApi} from '../../../store/application/selectors';

function FilmDetail({setApi}) {
  const params = useParams();

  const [data, setData] = useState({
    film: {},
    isPage: true,
    isLoading: false,
  });

  const {film, isLoading, isPage} = data;
  const {name, backgroundImage, posterImage} = film;

  const onSetFilm = (filmData) => {
    setData({
      ...data,
      film: filmData,
    });
  };

  useEffect(() => {
    fetchFilm(params.id, setApi)
      .then((filmData) => {
        setData({
          ...data,
          film: filmData,
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

          <FilmInfo film={film} onSetFilm={onSetFilm}/>

        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">

              <Tabs film={film}/>

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        <FilmListSimilar/>

        <Footer/>
      </div>
    </React.Fragment>
  );
}

FilmDetail.propTypes = {
  setApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  setApi: getApi(state),
});

export {FilmDetail};
export default connect(mapStateToProps, null)(FilmDetail);
