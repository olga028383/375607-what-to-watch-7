import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Header from './header';

let fakeApp = null;
let history = null;

describe('Component: Header', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    fakeApp = (
      <Router history={history}>
        <Header className='test'><h1>WTW</h1></Header>
      </Router>
    );
  });

  it('should display header', () => {

    render(fakeApp);

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
  });
});

