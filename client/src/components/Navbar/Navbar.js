import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

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

              <li className="nav-item"{...window.location.pathname === "/profile" ? "active" : ""}>
                <Link className="nav-link js-scroll-trigger" to="/profile">Profile</Link>
              </li>

               <li>
                <form action="/logout" method="GET">
                  <div>
                    <button className="btn btn-primary" type="submit">Log Out</button>
                  </div>
                </form>
              </li>

            </ul>
            </div>
          </div>
        </nav>

        <header className="masthead">
          <div className="intro-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  
                  <h1 className="brand-heading">CHOPPD</h1>
                  <p className="intro-text">Recipe Sharing
                    <br />Welcome.</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <br />
        
      </div>
    );
  }
}


export default Navbar;
