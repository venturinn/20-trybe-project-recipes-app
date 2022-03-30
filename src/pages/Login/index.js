import React from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';

function Login() {
  const history = useHistory();
  return (
    <section>
      <p>Login</p>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        enter
      </button>
    </section>
  );
}

export default Login;
