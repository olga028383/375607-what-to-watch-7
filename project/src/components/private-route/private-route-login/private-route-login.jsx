import React from 'react';
import {AppRoute, AuthorizationStatus} from '../../../constants';
import PropTypes from 'prop-types';
import PrivateRoute from '../private-route';
import {Redirect} from 'react-router-dom';

function PrivateRouteLogin({render, ...props}) {
  return (
    <PrivateRoute {...props} render={(routeProps, authorizationStatus) => authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.ROOT}/> : render(routeProps)}/>
  );
}

PrivateRouteLogin.propTypes = {
  render: PropTypes.func.isRequired,
};
export default PrivateRouteLogin;
