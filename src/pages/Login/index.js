import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  // https://stackoverflow.com/questions/7635533/validate-email-address-textbox-using-javascript
  const verifyEmailFormat = (userEmail) => {
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (userEmail.match(emailFormat)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const shouldEnabledButton = () => {
      const emailValid = verifyEmailFormat(email);
      const minPasswordLength = 7;
      if (emailValid && password.length >= minPasswordLength) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };
    shouldEnabledButton();
  }, [email, password]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const buttonClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));

    dispatch({ type: 'SAVE_USER_EMAIL', payload: email });

    setRedirect(true);
  };

  return (
    <div>
      {redirect && <Redirect to="/foods" />}
      <p>Login</p>
      <Input
        testId="email-input"
        label="Email"
        type="email"
        id="email"
        name="email"
        value={ email }
        onChange={ handleChange }
      />
      <br />
      <Input
        testId="password-input"
        label="Password"
        type="password"
        id="password"
        name="password"
        value={ password }
        onChange={ handleChange }
      />
      <br />
      <Button
        testId="login-submit-btn"
        label="Enter"
        disabled={ buttonDisabled }
        onClick={ buttonClick }
      />
    </div>
  );
}

export default Login;
