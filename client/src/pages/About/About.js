import React, { Component } from "react";
import API from "../../utils/API";


class About extends Component {

	state = {
    loggedIn: "",
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
      .catch(err => console.log(err));
    }
  };

	render() {
    return (
    <div>
      <div className="row">
        <div className="text-center col-sm-12">
          <form action="/login" method="post">
				    <div>
				      <label>Username:</label>
				      <input type="text" name="username"/>
				    </div>
				    <div>
				      <label>Password:</label>
				      <input type="password" name="password"/>
				    </div>
				    <div>
				      <input type="submit" value="Log In"/>
				    </div>
					</form>
        </div>
      </div>
    	<div className="row">
    		<div className="text-center col-sm-12">
      		<form>
					  <div className="form-group">
					  	<h3>Sign Up</h3>
					  	<div>
					      <label>Create Username:</label>
					      <input  
						      value={this.state.username}
						      onChange={this.handleInputChange}
						      name="username"
						      placeholder="Username (required)"
						    />
					    </div>
					    <div>
					      <label>Create Password:</label>
					      <input  
						      value={this.state.password}
						      onChange={this.handleInputChange}
						      name="password"
						      placeholder="Password (required)"
						    />
					    </div>
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
    );
  }
}

export default About;

