import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

function PrivateRoute({exec, path, authorizationStatus, render}) {
  return (
    <Route
      path={path}
      exec={exec}
      render={(routeProps) => render(routeProps, authorizationStatus)}
    />
  );
}

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exec: PropTypes.bool,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
