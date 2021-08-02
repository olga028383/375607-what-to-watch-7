import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../../../store/api-actions';
import {isValidateEmail} from '../../../../util';

const ErrorMessage = {
  passwordError: 'Password cannot be empty',
  emailError: 'Please enter a valid email address',
  formError: 'We can’t recognize this email and password combination. Please try again.',
};

function Form({onSubmit}) {
  const [data, setData] = useState({
    email: '',
    password: '',
    error: '',
    emailError: false,
    passwordError: false,
    disabled: false,
  });

  const {email, password, error, emailError, passwordError, disabled} = data;

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

    if (!isValidateEmail(email) ) {
      setData({
        ...data,
        emailError: true,
        error: ErrorMessage.emailError,
      });

      return;
    }

    if (password.length === 0) {
      setData({
        ...data,
        passwordError: true,
        error: ErrorMessage.passwordError,
      });

      return;
    }

    setData({
      ...data,
      disabled: true,
    });

    onSubmit({
      login: email,
      password: password,
    });

    setData({
      email: '',
      password: '',
      error: '',
      emailError: false,
      passwordError: false,
      disabled: false,
    });
  };

  return (
    <div className="sign-in user-page__content">
      <form action="#" className="sign-in__form" onSubmit={handleSubmit}>

        {error && <div className="sign-in__message"><p>{error}</p></div>}

        <div className="sign-in__fields">
          <div className={`sign-in__field ${emailError && 'sign-in__field--error'}`}>
            <input className="sign-in__input" disabled={disabled} data-testid="email" type="text" placeholder="Email address" name="user-email" id="user-email" value={email} onChange={handleEmailChange}/>
            <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
          </div>
          <div className={`sign-in__field ${passwordError && 'sign-in__field--error'}`}>
            <input className="sign-in__input" disabled={disabled} data-testid="password" type="password" placeholder="Password" name="user-password" id="user-password" value={password} onChange={handlePasswordChange}/>
            <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" disabled={disabled} type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(data) {
    dispatch(login(data));
  },
});

export {Form};
export default connect(null, mapDispatchToProps)(Form);
