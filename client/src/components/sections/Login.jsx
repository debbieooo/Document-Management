import React from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userAction';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("this.statesssssssss", this.state);
    this.props.actions.login(this.state.user)
      .then(token => {
        browserHistory.push('/home');
      })
      .catch(error => {
        this.setState({ error: 'Wrong input details' });
      });

    alert(`You have been signed in as${this.state.user}`);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const user = this.state.user;
    user[name] = value;
    return this.setState({ user });
  }
  render() {
    return (
      <div className="row">
        <div className="col s6 m6 l6" />
        <div className="col s6 m6 l6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div className="row">
                <h2>Login</h2>
                <form className="col s12" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field col s6">
                      <input placeholder="Email" name="email" id="email" type="email" className="validate" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="input-field col s6">
                      <input placeholder="Password" name="password" id="password" type="password" className="validate" value={this.state.password} onChange={this.handleChange} />
                    </div>
                  </div>
                  <button className="btn waves-effect waves-light" type="submit" name="action" value="submit">Submit
					<i className="material-icons right">send</i>
                  </button>
                  {this.state.error && <div><h5>{this.state.error}</h5></div>}
                </form>
              </div>
              <div className="card-action">
                  <Link to="/signup" className=" disabled">New User?</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('the state ', state);
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
