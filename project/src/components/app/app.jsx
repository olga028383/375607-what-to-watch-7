import React from 'react';
import PropTypes from 'prop-types';

import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../constants.js';
import Home from '../pages/home/home';
import MyList from '../pages/my-list/my-list';
import FilmDetail from '../pages/film-detail/film-detail';
import SingIn from '../pages/sing-in/sing-in';
import Review from '../pages/review/review';
import Player from '../pages/player/player';
import NotFound from '../not-found/not-found';

import films from "../../mocks/films";
import filmProp from '../film/film.prop.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.LOGIN}>
          <SingIn/>
        </Route>
        <Route exact path={AppRoute.ROOT}>
          <Home
            name={'The Grand Budapest Hotel'}
            genre={'Drama'}
            date={2014}
            films={films}
          />
        </Route>
        <Route exact path={AppRoute.MY_LIST}>
          <MyList films={films}/>
        </Route>
        <Route exact path={AppRoute.FILM_DETAIL}>
          <FilmDetail
            film={films[0]}
          />
        </Route>
        <Route exact path={AppRoute.REVIEW}>
          <Review/>
        </Route>
        <Route exact path={AppRoute.PLAYER}>
          <Player/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
};

export default App;
