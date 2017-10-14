import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  auth.isAuthenticated ? (
    <div>
      <form action="/logout" method="GET">
        <button className="btn btn-primary" type="submit" onClick={() => {
          auth.signout(() => history.push('/'))
        }}>Sign out</button>
      </form>
    </div>
  ) : (
    <div></div>
  )
));
// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navbar extends Component {

 
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/challenges">
                CHOPPD
              </Link>
            </div>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              
              <ul className="navbar-nav ml-auto">

                <li className="nav-item"{...window.location.pathname === "/" ? "active" : ""}>
                </li>

                <li className="nav-item"{...window.location.pathname === "/challenges" ? "active" : ""}>
                  <Link className="nav-link js-scroll-trigger" to="/challenges">Discover</Link>
                </li>

                <li className="nav-item"{...window.location.pathname === "/login" ? "active" : ""}>
                  <Link className="nav-link js-scroll-trigger" to="/login">Profile</Link>
                </li>

                <li>
                  {AuthButton} 
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}


export default Navbar;
