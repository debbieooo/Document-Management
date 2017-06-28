import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Landing from './components/sections/Landing.jsx';
import Login from './components/sections/Login.jsx';
import SignUp from './components/sections/SignUp.jsx';
import App from './components/layout/App.jsx';
import Dashboard from './components/sections/Dashboard.jsx';
import ManageUser from './components/sections/ManageUser.jsx';
import ManageDoc from './components/sections/ManageDoc.jsx';
import Profile from './components/sections/Profile.jsx';
import TextEditor from './components/sections/TextEditor.jsx';
import UpdateDoc from './components/sections/UpdateDoc.jsx';
import CreateDoc from './components/sections/CreateDoc.jsx';
// import ViewDoc from './components/sections/ViewDoc.jsx';
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
    <IndexRoute component={ManageDoc} />
    <Route path='/users' component={ManageUser} />
    <Route path='/documents' component={ManageDoc} />
    <Route path='/profile' component={Profile} />
     {/*<Route path='/documents/:id' component={ViewDoc} />*/}
    <Route path='/documents/:id/edit' component={UpdateDoc} />
    <Route path='/documents/create' component={CreateDoc} />


  </Route>
</Route>
);
