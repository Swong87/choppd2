import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navbar extends Component {

  signOut = () => {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
      console.log('User signed out.');
    // });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                CHOPPD
              </Link>
            </div>
            <ul className="nav navbar-nav">
              <li
                className={
                  window.location.pathname === "/"
                    ? "active"
                    : ""
                }
              >
              </li>
              <li
                className={window.location.pathname === "/challenges" ? "active" : ""}
              >
                <Link to="/challenges">Discover</Link>
              </li>
              <li className={window.location.pathname === "/search" ? "active" : ""}>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <a href="/" onClick={this.signOut}>Sign out</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="text-center jumbotron">
          <h1>CHOPPD</h1>
        </div>
        
      </div>
    );
  }
}


export default Navbar;
