import React, { Component } from "react";
import API from "../../utils/API";


class About extends Component {

	state = {
	username: "",
	password: ""
  };

  componentDidMount() {
	this.load();
  };

  load = () => {
	this.setState({
		username: "",
		password: ""
	})
  };

	handleInputChange = event => {
	const { name, value } = event.target;
	this.setState({
	  [name]: value
	});
  };

  handleFormSubmit = event => {
	event.preventDefault();
	if (this.state.username) {
	  API.saveUser({
		username: this.state.username,
		password: this.state.password
	  }).then(res => this.load())
	  .catch(err => alert('Username already exists!'));
	}
  };

	render() {
	return (
	<div>
		<div className="container">
		  <div className="row">
		  	<div className="text-center col-sm-6" id="splash">
		  	</div>
				<div className="text-center col-sm-6">
				  <form action="/login" method="post">
					  <h3>Login</h3>
						<div>
						  <input type="text" name="username" placeholder="Username" />
						</div>
						<br />
						<div>
						  <input type="password" name="password" placeholder="Password" />
						</div>
						<br />
						<div>
						  <input className="btn btn-primary" type="submit" value="Log In" />
						</div>
					</form>
					<br />
					<div className="row">
						<div className="col-sm-5">-----</div>
						<div className="col-sm-2">OR</div>
						<div className="col-sm-5">-----</div>
					</div>
					<br />
					<div className="row">
						<div className="text-center col-sm-12">
							<form>
							  <div className="form-group">
									<h3>Register</h3>
									<div>
									  <input  
										  value={this.state.username}
										  onChange={this.handleInputChange}
										  name="username"
										  placeholder="Username"
										/>
									</div>
									<br />
									<div>
									  <input  
										  value={this.state.password}
										  onChange={this.handleInputChange}
										  type="password"
										  name="password"
										  placeholder="Password"
										/>
									</div>
									<br />
									<div>
									  <button 
										  onClick={this.handleFormSubmit} 
										  className="btn btn-success"
										>
										  Create Account
										</button>
									</div>
							  </div>
							</form>
						</div>
					</div>
				</div>
		  </div>
		</div>
	</div>
	);
  }
}

export default About;

