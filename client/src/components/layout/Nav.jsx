import React from 'react';
import { browserHistory, Link } from 'react-router';

class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    alert('logout');
    localStorage.removeItem('token');
    browserHistory.push('/');
  }
  render() {
    return (
    <nav>
    <div className="nav-wrapper">
      <Link to = "/home" className="brand-logo">Doc</Link>
     <a className= "right" onClick= {this.handleClick} >Logout</a>
    </div>
  </nav>
    );
  }
}

export default Nav;
