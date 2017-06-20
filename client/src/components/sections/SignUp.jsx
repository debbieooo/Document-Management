import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as userActions  from '../../actions/userAction';

class SignUp extends React.Component {
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
    this.props.actions.signUp(this.state.user)
    .then((token) => {
      browserHistory.push('/home');
    })
    .catch((error) => {
      this.setState({ error: 'Wrong input details' });
    });
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
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
             	<div className="row">
				  <h1>Sign Up </h1>
				<form className="col s12" onSubmit={this.handleSubmit}>
						<div className="row">
						<div className="input-field col s6">
							<input placeholder="Name" name="name" id="name" type="text" className="validate" value={this.state.name} onChange={this.handleChange}/>
					</div>
					<div className="input-field col s6">
						<input placeholder="Username" name="userName" id="userName" type="text" className="validate" value={this.state.userName} onChange={this.handleChange}/>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s6">
						<input placeholder="Email" name="email" id="email" type="email" className="validate" value={this.state.email} onChange={this.handleChange}/>
					</div>
					<div className="input-field col s6">
						<input placeholder="Password" name="password" id="password" type="password" className="validate" value={this.state.password} onChange={this.handleChange}/>
					</div>
				</div>
				<button className="btn waves-effect waves-light" type="submit" name="action" value ="submit">Submit
				</button>
        {this.state.error && <div><h5>{this.state.error}</h5></div>}
			</form>
	</div>
           <div className="card-action">
          <Link to="/login" className=" disabled">Login ?</Link>
        </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
