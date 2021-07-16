import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {isCheckAuth} from '../../../util';
import {AppRoute} from '../../../constants';
import UserInfo from './user-info/user-info';


function User({authorizationStatus}) {
  return (
    isCheckAuth(authorizationStatus)
      ?
      <UserInfo/>
      :
      <div className="user-block">
        <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
      </div>

  );
}

User.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {User};
export default connect(mapStateToProps, null)(User);
