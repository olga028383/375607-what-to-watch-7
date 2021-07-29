import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlayButton from './play-button';

let fakeApp = null;
let history = null;

describe('Component: PlayButton', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    fakeApp = (
      <Router history={history}>
        <PlayButton filmId={1}/>
      </Router>
    );
  });

  it('should display play button', () => {

    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });
});

