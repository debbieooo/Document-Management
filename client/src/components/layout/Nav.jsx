import React from 'react';//eslint-disable-line
import { browserHistory, Link } from 'react-router';//eslint-disable-line


class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {//eslint-disable-line
    window.localStorage.removeItem('token');
    browserHistory.push('/');
  }
  render() {
    return (
    <nav>
    <div className="nav-wrapper">
      <Link to = "/home" className="brand-logo">Doc</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/users">Users</Link></li>
         <li> <Link to="/documents">Documents</Link></li>
          <li><Link to="/documents/create">New Document</Link>
</li>
        <li><Link to="/profile"> Edit Profile?</Link></li>
        <li><a className= "right" onClick= {this.handleClick} >Logout</a></li>
      </ul>
    </div>
  </nav>
    );
  }
}

export default Nav;
