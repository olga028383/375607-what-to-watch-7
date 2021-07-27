import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import userProp from '../user.prop.js';
import {logout} from '../../../../store/api-actions';
import {AppRoute} from '../../../../constants';
import {getUser} from '../../../../store/user/selectors';

function UserInfo({user, onLogout}) {
  const {avatar = '', email = ''} = user;
  const history = useHistory();
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={avatar} alt="User avatar" width="63" height="63" onClick={() => history.push(AppRoute.MY_LIST)}/>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={onLogout}>{email}</a>
      </li>
    </ul>
  );
}

UserInfo.propTypes = {
  user: userProp,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  },
});

export {UserInfo};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
