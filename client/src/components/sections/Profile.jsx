import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as userActions from '../../actions/userAction';

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      error: '',
      authUser: Object.assign({}, props.authUser),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.actions.activeUser();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ authUser: nextProps.authUser });
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const authUser = this.state.authUser;
    authUser[name] = value;
    this.setState({ authUser });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.sendUserUpdate(this.state.authUser)
      .then(() => {
        alert('Document has been updated');
        browserHistory.push('/home');
      });
  }
  render() {
    const { authUser } = this.state;

    return (
      <div>
        {(authUser.name) ?
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input value={authUser.name} id="first_name2" type="text" className="validate" name="name" onChange={this.handleChange} />
              <label className="active">Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input value={authUser.email} id="first_name2" type="text" className="validate" name="email" onChange={this.handleChange} />
              <label className="active">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input value={authUser.userName} id="first_name2" type="text" className="validate" name="userName" onChange={this.handleChange} />
              <label className="active">Username</label>
            </div>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
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
