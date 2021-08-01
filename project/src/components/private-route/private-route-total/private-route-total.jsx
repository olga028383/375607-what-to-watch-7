import React from 'react';
import {AppRoute, AuthorizationStatus} from '../../../constants';
import PropTypes from 'prop-types';
import PrivateRoute from '../private-route';
import {Redirect} from 'react-router-dom';

function PrivateRouteTotal({render, ...props}) {
  return (

    <PrivateRoute {...props} render={(routeProps, authorizationStatus) => authorizationStatus === AuthorizationStatus.AUTH ? render(routeProps) : <Redirect to={AppRoute.LOGIN}/>}/>
  );
}

PrivateRouteTotal.propTypes = {
  render: PropTypes.func.isRequired,
};
export default PrivateRouteTotal;
