import React from "react";
import { Link } from "react-router-dom";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = (props) =>
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
        {props.userInfo ?

          <ul className="navbar-nav ml-auto">

            <li className="nav-item"{...window.location.pathname === "/challenges" ? "active" : ""}>
              <Link className="nav-link js-scroll-trigger" to="/challenges">Discover</Link>
            </li>

            <li className="nav-item"{...window.location.pathname === "/login" ? "active" : ""}>
              <Link className="nav-link js-scroll-trigger" to={"/profile/" + props.userInfo}>Profile</Link>
            </li>

            <li>
              <Link className="btn btn-primary" to="/logout">Logout</Link>
            </li>

          </ul>
          :
          <ul className="navbar-nav ml-auto">
            <li>
              <div className="navbar-text">Welcome</div>
            </li>
          </ul>
        }
      </div>
    </div>
  </nav>;

export default Navbar;
