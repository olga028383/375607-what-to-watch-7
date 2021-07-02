import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';

import films from './mocks/films.js';
import comments from './mocks/comments.js';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        films={films}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root'));
