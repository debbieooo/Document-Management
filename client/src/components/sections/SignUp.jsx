import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as userActions from '../../actions/userAction';
/**
 * 
 * 
 * @class SignUp
 * @extends {React.Component}
 */
class SignUp extends React.Component {
  /**
   * Creates an instance of SignUp.
   * @param {any} props
   * @param {any} context
   *
   * @memberof SignUp
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign(
        {}, props.user, {
          password: '', confirmPassword: ''
        }),
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * 
   * 
   * @returns {null} null
   * @memberof SignUp
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.slider').slider();
    });
  }
  /**
 * 
 * 
 * @param {any} nextProps 
 * @returns {state} state  
 * 
 * @memberof SignUp
 */
  componentWillReceiveProps(nextProps) {
    if (!this.props.user.isAuthenticated && nextProps.user.isAuthenticated) {
      return browserHistory.push('/home');
    }
    return this.setState({ error: nextProps.user.error });
  }
  /**
   * 
   * 
   * @returns {null} null  
   * @memberof SignUp
   */
  componentWillUnmount() {
    this.setState({});
  }
  /**
   *
   *
   * @param {any} event
   * @returns {null} null 
   * @memberof SignUp
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.passwordConfirmation()) {
      this.props.actions.signUp(this.state.user);
    } else {
      this.setState({ error: 'Passwords do not match' });
    }
  }
  /**
   *
   *
   * @returns {boolean} boolean
   *
   * @memberof SignUp
   */
  passwordConfirmation() {
    return this.state.user.password === this.state.user.confirmPassword;
  }
  /**
   *
   *
   * @param {any} event
   * @returns {object} state
   *
   * @memberof SignUp
   */
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const user = this.state.user;
    user[name] = value;
    return this.setState({ user });
  }
  /**
   *
   *
   * @returns {object} div
   *
   * @memberof SignUp
   */
  render() {
    return (
      <div className="slider fullscreen">
        <ul className="slides">
          <li>
            <img src="/images/Landing.png" alt="" />
            <div className="caption center-align">
              <h3 id="landing-text">Doc Manager</h3>
              <h3>Sign up</h3>
              <div className="row">
                <form
                  className="col s12 offset-s3"
                  onSubmit={this.handleSubmit}
                >
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        placeholder="Name"
                        required="required"
                        name="name"
                        id="name"
                        type="text"
                        className="validate"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div />
                    <div className="row">
                      <div className="input-field col s3">
                        <input
                          placeholder="Username"
                          required="required"
                          name="userName"
                          id="userName"
                          type="text"
                          className="validate"
                          value={this.state.userName}
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="input-field col s3">
                        <input
                          placeholder="Email"
                          required="required"
                          name="email"
                          id="email"
                          type="email"
                          className="validate"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s3">
                        <input
                          placeholder="Password"
                          required="required"
                          name="password"
                          id="password"
                          type="password"
                          className="validate"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="input-field col s3">
                        <input
                          placeholder="Confirm Password"
                          required="required"
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          className="validate"
                          value={this.state.confirmPassword}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s3">
                        <span>{this.state.error}</span>
                      </div>
                    </div>
                    <div className="row">
                      <button
                        className="btn waves-effect waves-light col s3"
                        id="submit-btn"
                        type="submit"
                        name="action"
                        value="submit"
                      >
                        Submit
                        <i className="material-icons right"> send </i>
                      </button>
                      <div />
                      <Link to="/" className="col s3">Already A User?</Link>
                    </div>
                    {this.state.error && <div><h5>{this.state.error}</h5></div>}
                  </div>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
SignUp.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
/**
 *
 *
 * @param {any} state
 * @returns {object} user
 */
function mapStateToProps(state) {
  return {
    user: state.authUser
  };
}
/**
 *
 *
 * @param {any} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
