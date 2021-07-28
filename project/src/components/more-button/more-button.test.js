import React from 'react';
import {render, screen} from '@testing-library/react';
import MoreButton from './more-button';

describe('Component: MoreButton', () => {

  it('should display MoreButton', () => {

    render(<MoreButton onClickButton={()=>{}}/>);

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
