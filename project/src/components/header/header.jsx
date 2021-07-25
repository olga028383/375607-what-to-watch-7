import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

function Header({className, children}) {
  return (
    <header className={className}>
      <div className="logo">
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default React.memo(Header);
