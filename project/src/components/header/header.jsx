import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo/logo';

function Header({className, children}) {
  return (
    <header className={className}>
      <Logo/>

      {children}
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default React.memo(Header);
