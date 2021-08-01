import React from 'react';
import {render, screen} from '@testing-library/react';
import MoreButton from './more-button';
import userEvent from '@testing-library/user-event';

const onClickButton = jest.fn();

describe('Component: MoreButton', () => {

  it('should display MoreButton', () => {

    render(<MoreButton onClickButton={onClickButton}/>);

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });

  it('the click handler should be called', () => {
    render(<MoreButton onClickButton={onClickButton}/>);

    userEvent.click(screen.getByText(/Show more/i));
    expect(onClickButton).toHaveBeenCalled();
  });
});
