import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import SingIn from './sing-in';

let history;

jest.mock('./form/form', () => {
  function Form() {
    return <>Form</>;
  }

  return {
    __esModule: true,
    default: Form,
  };
});

describe('Component: SingIn', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    render(
      <Router history={history}>
        <SingIn/>
      </Router>);

    expect(screen.getByText(/Form/i)).toBeInTheDocument();

  });
});
