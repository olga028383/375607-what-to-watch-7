import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createApi} from './api';
import {fetchFilms, fetchFilmPromo, checkAuth} from './store/api-actions';
import {ActionCreator} from './store/action';
import {AuthorizationStatus} from './constants';
import {redirect} from './store/middlewares/redirect';

import App from './components/app/app';

import {reducer} from './store/reducer';

const api = createApi(() => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)), applyMiddleware(redirect)),
);

store.dispatch(ActionCreator.setApi(api));
store.dispatch(checkAuth());

Promise
  .all([
    fetchFilms(api),
    fetchFilmPromo(api),
  ])
  .then(([films, promoFilm]) => {
    store.dispatch(ActionCreator.setFilms(films));
    store.dispatch(ActionCreator.setFilmPromo(promoFilm));
    store.dispatch(ActionCreator.loadData());
  });


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root'));
