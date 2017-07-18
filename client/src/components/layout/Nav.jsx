import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as userActions from '../../actions/userAction';

/**
 * 
 * 
 * @class Nav
 * @extends {React.Component}
 */
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
   * @returns {null} null
   */
  componentDidMount() {
    this.props.actions.activeUser();
  }
  /**
   * 
   * 
   * @returns {null} null
   * @memberof Nav
   */
  componentWillUnmount() {
    this.setState({});
  }
  /**
   *
   *
   * @returns {null} null
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
 * @returns {null} null
 *
 * @memberof Nav
 */
  render() {
    const { authUser } = this.props;
    return (
      <nav>
        <div
          className="nav-wrapper"
          id="nav"
        >
          <Link to="/home" className="brand-logo" id="app-name">Doc-Manager</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="grey-text text-darken-4"><b>Hi {authUser.name}! </b></li>
            {authUser.roleId === 1 ? <li><Link to="/users">Users</Link></li> : ''}
            <li> <Link to="/documents">Documents</Link></li>
            <li><Link to="/documents/create" id="newDocument">New Document</Link></li>
            <li><Link to="/profile" id="profile"> Edit Profile?</Link></li>
            <li>
              <a
                role="link"
                tabIndex="0"
                className="right"
                id="logout"
                onClick={this.handleClick}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
Nav.propTypes = {
  authUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

/**
 *
 *
 * @param {any} state
 * @returns {object} state
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
 * @returns {object} object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);

