import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import App from '../App';
import reducer from '../redux/reducers';

// Funções 'getStore' e 'renderWithRouterAndStore' copiadas dos testes do projeto Trybe Wallet
// Não as compreendo bem ainda (Diego Venturin)!
const getStore = (initialState) => {
  if (!initialState) return createStore(reducer, applyMiddleware(thunk));
  return createStore(reducer, initialState, applyMiddleware(thunk));
};

const renderWithRouterAndStore = (component, routeConfigs = {}, initialState) => {
  const route = routeConfigs.route || '/';
  const store = getStore(initialState);
  const history = routeConfigs.history
      || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>{component}</Router>
      </Provider>,
    ),
    history,
    store,
  };
};

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_ENTER_TEST_ID = 'login-submit-btn';
const INVALID_EMAIL = 'email_incorreto@';
const INVALID_PASSWORD = '123456';
const VALID_EMAIL = 'email@correto.com';
const VALID_PASSWORD = '1234567';

describe('Testa o componente <Login.js />.', () => {
  test('A primeira rota deve ser para /', () => {
    const { history } = renderWithRouterAndStore(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('A página deve ter um campo imput para o usuário inserir o email', () => {
    renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    expect(email).toBeInTheDocument();
  });
  test('A página deve ter um campo imput para o usuário inserir a senha', () => {
    renderWithRouterAndStore(<App />);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(password).toBeInTheDocument();
  });
  test('A página deve ter um botão para o usuário logar', () => {
    renderWithRouterAndStore(<App />);
    const btn = screen.getByTestId(BUTTON_ENTER_TEST_ID);
    expect(btn).toBeInTheDocument();
  });

  test('O botão só deve estar habilitado com email e senha no formato correto', () => {
    renderWithRouterAndStore(<App />);
    const btn = screen.getByTestId(BUTTON_ENTER_TEST_ID);
    expect(btn).toBeDisabled();

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(btn).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, INVALID_PASSWORD);
    expect(btn).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(btn).not.toBeDisabled();
  });

  test('Informações devem ser armazenadas no localStorage e Estado Global', () => {
    const { store } = renderWithRouterAndStore(<App />);
    const btn = screen.getByTestId(BUTTON_ENTER_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    userEvent.click(btn);

    const user = JSON.parse(localStorage.getItem('user'));
    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));

    expect(store.getState().user.email).toStrictEqual(VALID_EMAIL);

    expect(user).toStrictEqual({ email: VALID_EMAIL });
    expect(mealsToken).toBe(1);
    expect(cocktailsToken).toBe(1);
  });

  test('Ao clicar no botão o usuário deve ser redirecionado para /foods', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const btn = screen.getByTestId(BUTTON_ENTER_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/foods');
  });
});
