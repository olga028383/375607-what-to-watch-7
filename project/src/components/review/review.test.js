import React from 'react';
import {render, screen} from '@testing-library/react';
import Review from './review';

const comment = {
  id: 1,
  userId: 4,
  userName: 'Kate Muir',
  rating: 8.9,
  comment: 'Discerning travellers.',
  date: '2019-05-08T14:13:56.569Z',
};
describe('Component: Review', () => {

  it('should display Review', () => {

    render(<Review review={comment}/>);

    expect(screen.getByText(/Kate Muir/i)).toBeInTheDocument();
    expect(screen.getByText(/Discerning travellers./i)).toBeInTheDocument();

  });
});

