import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Challenge from "./pages/Challenge";
import Footer from "./components/Footer";
import Alert from "./components/Alert";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/alert" component={Alert} />
        <Route exact path="/challenges" component={Discover} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/challenge/:id" component={Challenge} />
        <Route exact path="/login" component={About} />
        <Route exact path="/register" component={About} />
        <Route exact path="/logout" component={About} />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default App;