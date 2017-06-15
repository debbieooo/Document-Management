import React from 'react';
import { browserHistory } from 'react-router';

class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    alert('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    browserHistory.push('/');
  }
  render() {
    return (
    <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">Logo</a>
     <a className= "right" onClick= {this.handleClick} >Logout</a>
    </div>
  </nav>
    );
  }
}

export default Nav;
