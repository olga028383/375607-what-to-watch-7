import React from 'react';
import {render, screen} from '@testing-library/react';
import RatingField from './rating-field';

describe('Component: RatingField', () => {
  it('should display rating', () => {

    render(<RatingField index={9} value={9} handleRatingChange={() => {}} key={9}/>);

    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(9)).toBeInTheDocument();
  });
});

