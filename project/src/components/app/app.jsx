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

import filmProp from '../film/film.prop.js';

function App(props) {
  const {films} = props;
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
          <FilmDetail/>
        </Route>
        <Route
          exact
          path={AppRoute.REVIEW}
          render={({match}) => <Review film={films[match.params.id]}/>}
        >
        </Route>
        <Route
          exact
          path={AppRoute.PLAYER}
          render={({match}) => <Player film={films[match.params.id]}/>}
        >
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
