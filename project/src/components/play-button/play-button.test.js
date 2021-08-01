import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlayButton from './play-button';
import userEvent from '@testing-library/user-event';
import {AppRoute} from '../../constants';

let fakeApp = null;
let history = null;

describe('Component: PlayButton', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    fakeApp = (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.PLAYER.replace(':id', 1)}>
            <h1>Player</h1>
          </Route>
          <PlayButton filmId={1}/>
        </Switch>
      </Router>
    );
  });

  it('should display play button', () => {

    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });

  it('there should be a redirect to the player on click', () => {
    render(fakeApp);

    userEvent.click(screen.getByText(/Play/i));
    expect(screen.getByText(/Player/i)).toBeInTheDocument();

  });

});

