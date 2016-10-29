import '../sass/style.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './store/configure';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  , document.getElementById('root'));
