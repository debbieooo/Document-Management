import React from 'react';

export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: ''
    };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleSubmit(e) {
		alert('You have been signed in as' + this.state.name);
		event.preventDefault();
	}

	handleChange(event) {
		const target = event.target;
    const value = target.value;
    const name = target.name;

		this.setState({
			[name] : value
		})
			console.log(this);
	}
  render() {
    return (
        <div className="row">
				<div className="col s6 m6 l6"></div>
        <div className="col s6 m6 l6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <div className="row">
              <h2>Login</h2>
				<form className="col s12"  onSubmit={this.handleSubmit}>
				<div className="row">
					<div className="input-field col s6">
						<input placeholder="Email" name="email" id="email" type="email" className="validate" value={this.state.email} onChange={this.handleChange}/>
					</div>
					<div className="input-field col s6">
						<input placeholder="Password" name="password" id="password" type="password" className="validate" value={this.state.password} onChange={this.handleChange}/>
					</div>
				</div>
				<button className="btn waves-effect waves-light" type="submit" name="action" value ="submit">Submit
					<i className="material-icons right">send</i>
				</button>			
			</form>
	</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
