import React from 'react';
import ReactDOM from 'react-dom';
import {Router as BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import browserHistory from './browser-history';

import {createApi} from './api';
import {fetchFilms, fetchFilmPromo, checkAuth} from './store/api-actions';
import {setApi, requireAuthorization, setFilms, setFilmPromoAction, loadData} from './store/action';
import {AuthorizationStatus} from './constants';
import {redirect} from './store/middlewares/redirect';

import App from './components/app/app';

import reducer from './store/reducer';

const api = createApi(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)), applyMiddleware(redirect)),
);

store.dispatch(setApi(api));
store.dispatch(checkAuth());

Promise
  .all([
    fetchFilms(api),
    fetchFilmPromo(api),
  ])
  .then(([films, promoFilm]) => {
    store.dispatch(setFilms(films));
    store.dispatch(setFilmPromoAction(promoFilm));
    store.dispatch(loadData());
  });


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root'));
