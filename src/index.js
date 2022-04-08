import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import GlobalStyle from './GlobalStyle';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <GlobalStyle />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
