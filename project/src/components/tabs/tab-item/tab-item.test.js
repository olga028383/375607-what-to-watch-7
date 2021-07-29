import React from 'react';
import {render, screen} from '@testing-library/react';
import TabItem from './tab-item';

describe('Component: TabItem', () => {

  it('should display tab item active', () => {

    const {container} = render(<TabItem title='test' currentTab={'test'} onClickTab={() => {}}/>);
    const active = container.querySelector('.film-nav__item--active');

    expect(active).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('should display tab item not active', () => {

    render(<TabItem title='test' currentTab={'current'} onClickTab={() => {}}/>);

    expect(screen.getByText(/test/i)).toBeInTheDocument();

  });
});

