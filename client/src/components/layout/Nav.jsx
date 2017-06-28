import React from 'react';//eslint-disable-line
import { browserHistory, Link } from 'react-router';//eslint-disable-line
import { connect } from 'react-redux';//eslint-disable-line
import { bindActionCreators } from 'redux';//eslint-disable-line
import { activeUser } from '../../actions/userAction';//eslint-disable-line


class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      authUser: Object.assign({}, props.authUser),
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.actions.activeUser();
  }
  handleClick() {//eslint-disable-line
    window.localStorage.removeItem('token');
    browserHistory.push('/');
  }

  render() {
    const { authUser } = this.props;
    return (
    <nav>
    <div className="nav-wrapper">
      <Link to = "/home" className="brand-logo">Doc</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
    {(authUser.roleId === 1) ? <li><Link to="/users">Users</Link></li> : ''}
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

function mapStateToProps(state) {
  return {
    authUser: state.authUser,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      activeUser }, dispatch
      )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);

