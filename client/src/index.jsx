/*eslint-disable import/default */
// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Dashboard from './components/sections/Dashboard.jsx';
import routes from './route';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/store.js';
import {Provider} from 'react-redux';
import {signUp} from './actions/userAction.js';

const store = configureStore();
store.dispatch(signUp());
// import '../styles/main.scss';
render(
  <Provider store = {store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
