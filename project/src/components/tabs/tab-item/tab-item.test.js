import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabItem from './tab-item';

const onClickTab = jest.fn();

describe('Component: TabItem', () => {

  it('should display tab item active', () => {

    const {container} = render(<TabItem title='test' currentTab={'test'} onClickTab={onClickTab}/>);
    const active = container.querySelector('.film-nav__item--active');

    expect(active).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('should display tab item not active', () => {

    render(<TabItem title='test' currentTab={'current'} onClickTab={onClickTab}/>);

    expect(screen.getByText(/test/i)).toBeInTheDocument();

  });

  it('the click should be called', () => {

    render(<TabItem title='test' currentTab={'current'} onClickTab={onClickTab}/>);

    userEvent.click(screen.getByText(/test/i));
    expect(onClickTab).toHaveBeenCalled();

  });
});

