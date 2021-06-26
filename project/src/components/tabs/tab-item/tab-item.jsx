import React from 'react';
import PropTypes from 'prop-types';
import {Route, Link, useLocation} from 'react-router-dom';

function TabItem({to, title, ...rest}) {
  const location = useLocation();

  return (
    <Route
      path={to}
      children={({match}) => (
        <li className={(match && match.path === location.pathname) ? 'film-nav__item  film-nav__item--active' : 'film-nav__item '}>
          <Link to={to} {...rest}>{title}</Link>
        </li>
      )}
    />
  );
}

TabItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TabItem;
