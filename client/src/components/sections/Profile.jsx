import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as userActions from '../../actions/userAction';

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
      authUser: Object.assign({}, props.authUser, { password: '', confirmPassword: '' })
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   *
   *
   *
   * @memberof Profile
   */
  componentDidMount() {
    this.props.actions.activeUser();
  }
/**
 *
 *
 * @param {any} nextProps
 *
 * @memberof Profile
 */
  componentWillReceiveProps(nextProps) {
    this.setState({ authUser: { ...nextProps.authUser } });
  }
/**
 *
 *
 * @param {any} event
 *
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
   * @returns
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
   *
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
   * @returns
   *
   * @memberof Profile
   */
  render() {
    const { authUser } = this.state;

    return (
      <div>
        {authUser.name
        ? <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6 ">
              <input value={authUser.name}
               id="first_name2"
               type="text"
               className="validate"
               name="name"
               onChange={this.handleChange} />
              <label className="active">Name</label>
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
              onChange={this.handleChange} />
              <label className="active">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input value={authUser.userName}
               id="userName"
               type="text"
               className="validate"
               name="userName"
               onChange={this.handleChange} />
              <label className="active">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input value={authUser.password}
               id="password"
               type="password"
               name="password"
               onChange={this.handleChange} />
              <label className="active">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input value={authUser.confirmPassword}
               id="password"
               type="password"
               name="confirmPassword"
               onChange={this.handleChange} />
              <label className="active"> Confirm Password</label>
              <span>{this.state.error}</span>
            </div>
          </div>
          <div className="row">
            <button
            className="btn waves-effect waves-light"
             type="submit"
             name="action">
             Submit
                </button>
          </div>
        </form>
        : <img src="/images/default.gif" />
        }

      </div>
    );
  }
}
Profile.propTypes = {
  users: PropTypes.array.isRequired
};
Profile.defaultProps = {
  users: []
};
/**
 *
 *
 * @param {any} state
 * @returns
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
 * @returns
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
