import React from 'react';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';

function TabItem({to, title, ...rest}) {
  const location = useLocation();

  return (
    <li className={'film-nav__item' + ((to === location.pathname) ? ' film-nav__item--active' : '')}>
      <Link to={to} {...rest}>{title}</Link>
    </li>
  );
}

TabItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TabItem;
