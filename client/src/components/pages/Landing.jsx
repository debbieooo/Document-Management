import React from 'react';
// import styles from './LandingSyle.scss'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import {  Link, browserHistory } from 'react-router';

const Landing = () => (
    <div className = "Landing">
        <div className="row center-align">
            <h1>Welcome to Doc Manager</h1>
        </div>
        <div className="row center-align">  
            <button className="btn waves-effect waves-light col s6" type="submit" name="action"><Link to='/signup' activeClassName="active">Sign Up</Link>
            </button>
            <button className="btn waves-effect waves-light col s6" type="submit" name="action"><Link to='/login' activeClassName="active">Login</Link>
            </button>
        </div>
    </div>
  );
export default Landing;