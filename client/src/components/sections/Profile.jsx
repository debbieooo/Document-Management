import React, { PropTypes } from 'react';//eslint-disable-line
import { bindActionCreators } from 'redux';//eslint-disable-line
import { connect } from 'react-redux';//eslint-disable-line
import { browserHistory } from 'react-router';//eslint-disable-line
import * as userActions from '../../actions/userAction';//eslint-disable-line

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      error: '',
      authUser: Object.assign({}, props.authUser, { password: '', confirmPassword: '' }),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.actions.activeUser();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ authUser: { ...nextProps.authUser } });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const authUser = this.state.authUser;
    authUser[name] = value;
    this.setState({ authUser });
  }
  passwordConfirmation() {
    return this.state.authUser.password === this.state.authUser.confirmPassword;
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.passwordConfirmation()) {
      delete this.state.authUser.confirmPassword;
      console.log(this.state.authUser);
      this.props.actions.sendUserUpdate(this.state.authUser)
      .then(() => {
        browserHistory.push('/home');
      });
    } else {
      this.setState({ error: 'Passwords do not match' });
    }
    // console.log(this.state.authUser);
  }
  render() {
    const { authUser } = this.state;

    return (
      <div>
        {(authUser.name) ?
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
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
        :
        <img src="/images/default.gif" />
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
function mapStateToProps(state) {
  return {

    users: state.users,
    authUser: state.authUser
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
