import React from "react";

const Alert = (props) =>
  <div className="alert alert-danger text-center" role="alert">
  	{props.type === "register" ? (
  		<strong>Username already exists!</strong>
  	) : props.type === "login" ? (
  		<strong>Username or Password is incorrect!</strong>
  	) : (
		<strong>nothing</strong>
  	)}
    
  </div>;

export default Alert;