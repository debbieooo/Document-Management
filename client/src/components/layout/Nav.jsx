import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as userActions from '../../actions/userAction';


class Nav extends React.Component {
  /**
   * Creates an instance of Nav.
   * @param {any} props
   * @param {any} context
   *
   * @memberof Nav
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      authUser: Object.assign({}, props.authUser)
    };
    this.handleClick = this.handleClick.bind(this);
  }
  /**
   *
   *
   *
   * @memberof Nav
   */
  componentDidMount() {
    this.props.actions.activeUser();
  }
  /**
   * 
   * 
   * 
   * @memberof Nav
   */
  componentWillUnmount() {
    this.setState({});
  }
  /**
   *
   *
   *
   * @memberof Nav
   */
  handleClick() {
    window.localStorage.removeItem('token');
    this.props.actions.logout();
    browserHistory.push('/');
  }
/**
 *
 *
 * @returns
 *
 * @memberof Nav
 */
  render() {
    const { authUser } = this.props;
    return (
    <nav>
    <div className="nav-wrapper" id="nav">
      <Link to = "/home" className="brand-logo" id="app-name">Doc</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
       <li className= "orange-text text-darken-4"><b>Hi {authUser.name}! </b></li>
    {authUser.roleId === 1 ? <li><Link to="/users">Users</Link></li> : ''}
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
/**
 *
 *
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    authUser: state.authUser
  };
}
/**
 *
 *
 * @param {any} dispatch
 * @returns
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);

