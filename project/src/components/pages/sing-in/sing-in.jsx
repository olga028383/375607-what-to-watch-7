import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../../store/api-actions';
import Header from '../../header/header.jsx';
import Footer from '../../footer/footer.jsx';
import {isValidateEmail} from '../../../util';

const ErrorMessages = {
  emailError: 'Please enter a valid email address',
  formError: 'We can’t recognize this email and password combination. Please try again.',
};

function SingIn({onSubmit}) {
  const [data, setData] = useState({
    email: '',
    password: '',
    error: '',
    emailError: false,
  });

  const {email, password, error, emailError} = data;

  const handleEmailChange = (evt) => {
    setData({
      ...data,
      email: evt.target.value,
    });
  };

  const handlePasswordChange = (evt) => {
    setData({
      ...data,
      password: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!isValidateEmail(email)) {
      setData({
        ...data,
        emailError: true,
        error: ErrorMessages.emailError,
      });

      return;
    }

    onSubmit({
      login: email,
      password: password,
    });

    setData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="user-page">
      <Header className='page-header user-page__head'>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>

          {error && <div className="sign-in__message"><p>{error}</p></div>}

          <div className="sign-in__fields">
            <div className={`sign-in__field ${emailError && 'sign-in__field--error'}`}>
              <input className="sign-in__input" type="text" placeholder="Email address" name="user-email" id="user-email" required value={email} onChange={handleEmailChange}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" required placeholder="Password" name="user-password" id="user-password" value={password} onChange={handlePasswordChange}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}

SingIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(data) {
    dispatch(login(data));
  },
});

export {SingIn};
export default connect(null, mapDispatchToProps)(SingIn);
