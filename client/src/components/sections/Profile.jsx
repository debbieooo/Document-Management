import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as userActions from '../../actions/userAction';
/**
 * 
 * 
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
   * Creates an instance of Profile.
   * @param {any} props
   * @param {any} context
   *
   * @memberof Profile
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      error: '',
      authUser: Object.assign(
        {},
        props.authUser,
        {
          password: '',
          confirmPassword: ''
        }
      )
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof Profile
   */
  componentDidMount() {
    this.props.actions.activeUser();
  }
  /**
   *
   *
   * @param {any} nextProps
   * @returns {null} null
   * @memberof Profile
   */
  componentWillReceiveProps(nextProps) {
    this.setState(
      { authUser: { ...nextProps.authUser }
      }
    );
  }
  /**
   *
   *
   * @param {any} event
   * @returns {null} null
   * @memberof Profile
   */
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const authUser = this.state.authUser;
    authUser[name] = value;
    this.setState({ authUser });
  }
  /**
   *
   *
   * @returns {state} state
   *
   * @memberof Profile
   */
  passwordConfirmation() {
    return this.state.authUser.password === this.state.authUser.confirmPassword;
  }
  /**
   *
   *
   * @param {any} event
   * @returns {state} state
   * @memberof Profile
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.passwordConfirmation()) {
      delete this.state.authUser.confirmPassword;
      this.props.actions.sendUserUpdate(this.state.authUser)
        .then(() => {
          browserHistory.push('/home');
        });
    } else {
      this.setState({ error: 'Passwords do not match' });
    }
  }
  /**
   *
   *
   * @returns {div} element
   *
   * @memberof Profile
   */
  render() {
    const { authUser } = this.state;

    return (
      <div id="profile" className="profile">
        <h5>Edit Profile</h5>
        {authUser.name
          ? <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6 ">
                <input
                  value={authUser.name}
                  id="name"
                  type="text"
                  className="validate"
                  name="name"
                  onChange={this.handleChange}
                />
                <label className="active" >
                  Name
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={authUser.email}
                  id="first_name2"
                  type="text"
                  className="validate"
                  name="email"
                  onChange={this.handleChange}
                />
                <label className="active">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={authUser.userName}
                  id="userName"
                  type="text"
                  className="validate"
                  name="userName"
                  onChange={this.handleChange}
                />
                <label className="active">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={authUser.password}
                  id="password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
                <label className="active">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={authUser.confirmPassword}
                  id="password"
                  type="password"
                  name="confirmPassword"
                  onChange={this.handleChange}
                />
                <label className="active"> Confirm Password</label>
                <span>{this.state.error}</span>
              </div>
            </div>
            <div className="row">
              <button
                className="btn waves-effect waves-light"
                id="editProfile"
                type="submit"
                name="action"
              >
                Submit
              </button>
            </div>
          </form>
          : <img src="/images/default.gif"alt="" />
        }

      </div>
    );
  }
}
Profile.propTypes = {
  actions: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  user: PropTypes.object,
};
Profile.defaultProps = {
  user: {}
};
/**
 *
 *
 * @param {any} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {

    users: state.users,
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
