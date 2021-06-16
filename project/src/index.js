import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import films from './mocks/films.js';
import comments from './mocks/comments.js';

ReactDOM.render(
  <React.StrictMode>
    <App
      films={films}
      comments={comments}
    />
  </React.StrictMode>,
  document.getElementById('root'));
