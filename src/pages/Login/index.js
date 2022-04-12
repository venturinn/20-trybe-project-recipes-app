import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import LogoImg from '../../images/logo.svg';
import MainBackground from '../../images/bg-one.svg';
import FormBackground from '../../images/bg-two.svg';
import {
  LoginContainer,
  OpacityContainer,
  MainPage,
  Logo,
  ChefHat,
  Form,
  LoginInput,
  LoginButton,
  StartSessionButton,
  TitleContainer,
  LoginTitle,
} from './Style';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [startUserSession, setStartUserSession] = useState(false);
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

  const handleStartUserSession = (startSession) => {
    setStartUserSession(!startSession);
  };

  return (
    <LoginContainer theme={ { bg: startUserSession ? FormBackground : MainBackground } }>
      {redirect && <Redirect to="/foods" />}
      <OpacityContainer>
        { !startUserSession ? (
          <MainPage>
            <TitleContainer>
              <ChefHat />
              <Logo src={ LogoImg } />
            </TitleContainer>
            <StartSessionButton
              label="Start Session"
              testId=""
              onClick={ () => handleStartUserSession(startUserSession) }
            />
          </MainPage>
        ) : (
          <Form>
            <LoginTitle>Welcome back!</LoginTitle>
            <LoginInput
              testId="email-input"
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={ email }
              onChange={ handleChange }
            />
            <LoginInput
              testId="password-input"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={ password }
              onChange={ handleChange }
            />
            <LoginButton
              testId="login-submit-btn"
              label="Login"
              disabled={ buttonDisabled }
              onClick={ buttonClick }
            />
          </Form>
        )}
      </OpacityContainer>
    </LoginContainer>
  );
}

export default Login;
