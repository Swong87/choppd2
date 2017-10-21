import React, { Component } from "react";
import API from "../../utils/API";
import Header from "../../components/Header";
import Alert from "../../components/Alert";

class About extends Component {

	state = {
		username: "",
		password: "",
		currentUser: "",
		error: ""
	};

	componentWillMount() {
		API.logout()
			.catch(err => console.log(err))
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleLogin = event => {
		event.preventDefault();
		if (this.state.username && this.state.password) {
			API.login({
				username: this.state.username,
				password: this.state.password
			})
				.then(res => {
					if (res.data.user) {
						this.props.history.push('/challenges');
					}
					else {
						console.log("no user");
					}
				})
				.catch(res => {
					this.setState({
						error: "login"
					})
				});
		} else {
			alert("Please fill in both fields.");
		}
	};

	handleRegister = event => {
		event.preventDefault();
		if (this.state.username && this.state.password) {
			API.register({
				username: this.state.username,
				password: this.state.password
			})
				.then(res => {
					if(res.data.user){
						this.props.history.push('/challenges');
					}
					else {
						return (<Alert />);
					}
				})
				.catch(res => {
					this.setState({
						error: "register"
					})
				});
		} else {
			alert("Please fill in both fields.");
		}
	};

	render() {
		return (
			<div>
				{this.state.error ? (
					<div>
						<Header />
						<div className="container">
						<Alert type={this.state.error} />
							<div className="row">
								<div className="text-center col-sm-6" id="splash">
								</div>
								<div className="text-center col-sm-6">
									<form>
										<h3>Login</h3>
										<div>
											<input 
												type="text" 
												name="username" 
												placeholder="Username"
												onChange={this.handleInputChange}
											 />
										</div>
										<br />
										<div>
											<input 
												type="password" 
												name="password" 
												placeholder="Password"
												onChange={this.handleInputChange}
											/>
										</div>
										<br />
										<div>
											<button className="btn btn-primary" onClick={this.handleLogin}>
												Log In
											</button>
										</div>
									</form>
									<br />
									<div className="row">
										<div className="col-sm-5"></div>
										<div className="col-sm-2">OR</div>
										<div className="col-sm-5"></div>
									</div>
									<br />
									<div className="row">
										<div className="text-center col-sm-12">
											<form>
												<div className="form-group">
													<h3>Register</h3>
													<div>
														<input  
															onChange={this.handleInputChange}
															name="username"
															placeholder="Username"
														/>
													</div>
													<br />
													<div>
														<input  
															onChange={this.handleInputChange}
															type="password"
															name="password"
															placeholder="Password"
														/>
													</div>
													<br />
													<div>
														<button onClick={this.handleRegister} className="btn btn-success">
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
				) : (
				<div>
					<Header />
					<div className="container">
						<div className="row">
							<div className="text-center col-sm-6" id="splash">
							</div>
							<div className="text-center col-sm-6">
								<form>
									<h3>Login</h3>
									<div>
										<input 
											type="text" 
											name="username" 
											placeholder="Username"
											onChange={this.handleInputChange}
										 />
									</div>
									<br />
									<div>
										<input 
											type="password" 
											name="password" 
											placeholder="Password"
											onChange={this.handleInputChange}
										/>
									</div>
									<br />
									<div>
										<button className="btn btn-primary" onClick={this.handleLogin}>
											Log In
										</button>
									</div>
								</form>
								<br />
								<div className="row">
									<div className="col-sm-5"></div>
									<div className="col-sm-2">OR</div>
									<div className="col-sm-5"></div>
								</div>
								<br />
								<div className="row">
									<div className="text-center col-sm-12">
										<form>
											<div className="form-group">
												<h3>Register</h3>
												<div>
													<input  
														onChange={this.handleInputChange}
														name="username"
														placeholder="Username"
													/>
												</div>
												<br />
												<div>
													<input  
														onChange={this.handleInputChange}
														type="password"
														name="password"
														placeholder="Password"
													/>
												</div>
												<br />
												<div>
													<button onClick={this.handleRegister} className="btn btn-success">
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
				)}
				
			</div>
		);
	}
}

export default About;

