/* eslint-disable import/default */
// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
// import Dashboard from './components/sections/Dashboard.jsx';
import { Provider } from 'react-redux';
import routes from './route';
import configureStore from './store/store';
// import { signUp, login, userlist } from './actions/userAction';


const store = configureStore();
// store.dispatch(signUp());
// store.dispatch(login());
// store.dispatch(userlist());
// import '../styles/main.scss';
render(
  <Provider store = {store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  global.document.getElementById('app')
);
