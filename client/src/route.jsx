import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './components/sections/Login.jsx';
import SignUp from './components/sections/SignUp.jsx';
import App from './components/layout/App.jsx';
import ManageUser from './components/sections/ManageUser.jsx';
import ManageDocuments from './components/sections/ManageDocuments.jsx';
import Profile from './components/sections/Profile.jsx';
import UpdateDoc from './components/sections/UpdateDoc.jsx';
import ViewDoc from './components/sections/ViewDoc.jsx';
import CreateDocument from './components/sections/CreateDocument.jsx';
import NotFound from './components/sections/NotFound.jsx';

/**
 * @returns {null} null
 * @param {*} nextState
 * @param {*} replace
 */
const onEnter = (nextState, replace) => {
  const token = window.localStorage.getItem('token') !== undefined;
  if (!token) {
    replace('/');
  }
};

export default <Route>
  <Route path="/" component={Login} />
  <Route path="/login" component={Login} />
  <Route path="/signup" component={SignUp} />
  <Route path="/home" component={App} onEnter={onEnter}>
    <IndexRoute component={ManageDocuments} />
    <Route path="/users" component={ManageUser} />
    <Route path="/documents" component={ManageDocuments} />
    <Route path="/profile" component={Profile} />
    <Route path="/documents/create" component={CreateDocument} />
    <Route path="/documents/:id" component={ViewDoc} />
    <Route path="/documents/:id/edit" component={UpdateDoc} />
    <Route path="*" component={NotFound} />
  </Route>
</Route>;
