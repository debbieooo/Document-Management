import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Landing from './components/sections/Landing.jsx';
import Login from './components/sections/Login.jsx';
import SignUp from './components/sections/SignUp.jsx';
import App from './components/layout/App.jsx';
import Dashboard from './components/sections/Dashboard.jsx';
// eslint-disable-line import/no-named-as-default

const onEnter = (nextState, replace) => {
  const token = localStorage.getItem('token') !== undefined;
  if (!token) {
    replace('/');
  }
};
export default (
<Route>
 <Route path="/" component={Landing} />
  <Route path="/login" component={Login} />
   <Route path="/signup" component={SignUp} />
  <Route path="/home" component={App} onEnter = {onEnter}>
    <IndexRoute component={Dashboard} />
  </Route>
</Route>
);
