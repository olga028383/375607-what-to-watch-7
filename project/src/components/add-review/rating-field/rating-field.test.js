import React from 'react';
import {render, screen} from '@testing-library/react';
import RatingField from './rating-field';

const KEY = 9;
describe('Component: RatingField', () => {
  it('should display rating', () => {

    render(<RatingField index={KEY} value={KEY} handleRatingChange={jest.fn()} key={KEY}/>);

    expect(screen.getByLabelText(/Rating 9/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(KEY)).toBeInTheDocument();
  });
});

