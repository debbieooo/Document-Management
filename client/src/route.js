import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './components/sections/Login.jsx';
import SignUp from './components/sections/SignUp.jsx';
import App from './components/layout/App.jsx';
import ManageUser from './components/sections/ManageUser.jsx';
import ManageDoc from './components/sections/ManageDoc.jsx';
import Profile from './components/sections/Profile.jsx';
import TextEditor from './components/sections/TextEditor.jsx';
import UpdateDoc from './components/sections/UpdateDoc.jsx';
import CreateDoc from './components/sections/CreateDoc.jsx';
import NotFound from './components/sections/NotFound.jsx';

/**
 *
 * @param {*} nextState
 * @param {*} replace
 */
const onEnter = (nextState, replace) => {
  const token = window.localStorage.getItem('token') !== undefined;
  if (!token) {
    replace('/');
  }
};
export default
<Route>
 <Route path="/" component={Login} />
  <Route path="/login" component={Login} />
   <Route path="/signup" component={SignUp} />
  <Route path="/home" component={App} onEnter = {onEnter}>
    <IndexRoute component={ManageDoc} />
    <Route path='/users' component={ManageUser} />
    <Route path='/documents' component={ManageDoc} />
    <Route path='/profile' component={Profile} />
    <Route path='/documents/:id/edit' component={UpdateDoc} />
    <Route path='/documents/create' component={CreateDoc} />
    <Route path="*" component={NotFound} />
  </Route>
</Route>
;
