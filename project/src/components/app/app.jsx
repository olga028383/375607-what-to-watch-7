import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import browserHistory from '../../browser-history';

import Home from '../pages/home/home';
import MyList from '../pages/my-list/my-list';
import FilmDetail from '../pages/film-detail/film-detail';
import SingIn from '../pages/sing-in/sing-in';
import Review from '../pages/review/review';
import Player from '../pages/player/player';
import NotFound from '../not-found/not-found';
import Loading from '../loading/loading';
import PrivateRouteLogin from '../private-route/private-route-login/private-route-login';
import PrivateRouteTotal from '../private-route/private-route-total/private-route-total';

import {AppRoute} from '../../constants.js';

import {getIsLoadData} from '../../store/data/selectors';

function App({isDataLoaded}) {
  if (!isDataLoaded) {
    return (
      <Loading/>
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <PrivateRouteLogin exact path={AppRoute.LOGIN} render={() => <SingIn/>}></PrivateRouteLogin>
        <Route exact path={AppRoute.ROOT}>
          <Home/>
        </Route>
        <PrivateRouteTotal exact path={AppRoute.MY_LIST} render={() => <MyList/>}/>
        <Route
          exact
          path={AppRoute.FILM_DETAIL}
          render={({match}) => <FilmDetail/>}
        >
        </Route>
        <PrivateRouteTotal exact path={AppRoute.REVIEW} render={() => <Review/>}/>
        <Route
          exact
          path={AppRoute.PLAYER}
          render={({match}) => <Player/>}
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
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isDataLoaded: getIsLoadData(state),
});

export {App};
export default connect(mapStateToProps, null)(App);

