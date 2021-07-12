import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createApi} from './api';
import {fetchFilms, fetchFilmPromo} from './store/api-actions';
import {ActionCreator} from './store/action';

import App from './components/app/app';

import comments from './mocks/comments.js';

import {reducer} from './store/reducer';

const api = createApi();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

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
      <App
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root'));
