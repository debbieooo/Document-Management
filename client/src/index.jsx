/*eslint-disable import/default */
// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Dashboard from './components/pages/Dashboard.jsx';
import routes from './route';
import { Router, browserHistory } from 'react-router';

// import '../styles/main.scss';
render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
