import React from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userAction';

class Login extends React.Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @param {any} context
   *
   * @memberof Login
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
 *
 *
 *
 * @memberof Login
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
   *
   * @memberof Login
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
   * 
   * @memberof Login
   */
  componentWillUnmount() {
    this.setState({});
  }
  /**
   *
   *
   * @param {any} event
   *
   * @memberof Login
   */
  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state.user;
    const loginUser = { email, password };
    this.props.actions.login(loginUser);
  }

  /**
   *
   *
   * @param {any} event
   * @returns
   *
   * @memberof Login
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
   * @returns
   *
   * @memberof Login
   */
  render() {
    return (
      <div className="slider fullscreen">
        <ul className="slides">
          <li>
            <img src="/images/Landing.png" />
            <div className="caption center-align">
              <h3 id="landing-text">Doc Manager</h3>
              <h5
                className="light grey-text text-lighten-3"
              >
              Document Management System
              </h5>
              <div className="row">
                <h4>Login</h4>
                <form
                  className="col s12 offset-s3"
                  onSubmit={this.handleSubmit}
                >
                  <div className="row">
                    <div className="input-field col s6 ">
                      <input
placeholder="Email"
                        required="required"
                        name="email"
                        id="email"
                        type="email"
                        className="validate input"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className ="row">
                      <div className="input-field col s6">
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
                    </div>
                  <div className="row col s6">
                    <button
className="btn waves-effect waves-light"
                      id="login-button"
                      type="submit"
                      name="action"
                      value="submit"
                  >
                    Login
                      <i className="material-icons right">
                      send
                      </i>
                    </button>
                  </div>
                  {this.state.error && <div><h5>{this.state.error}</h5></div>}
                </form>
              </div>
              <div className="card-action">
                <Link to="/signup" className=" disabled">New User?</Link>
              </div>
            </div>
          </li>
        </ul>
      </div >

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
    user: state.authUser
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
