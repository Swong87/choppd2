import React from "react";


const About = () =>
    <div>
      <div className="row">
        <div className="text-center col-sm-12">
          <p>Sign In</p>
          <div className="g-signin2" data-onsuccess="onSignIn"></div>
          <a onclick="signOut">Sign out</a>
        </div>
      </div>
    </div>;

export default About;
