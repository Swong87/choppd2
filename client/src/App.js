import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Challenge from "./pages/Challenge";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () =>
  <Router>
    <div>
    <Navbar />
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/about" component={About} />
        <Route exact path="/challenges" component={Discover} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default App;
