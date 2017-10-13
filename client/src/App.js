import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Challenge from "./pages/Challenge";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import All from "./components/All";
// import EnsureLoggedInContainer from "./components/EnsureLoggedInContainer";
          // <Route component={EnsureLoggedInContainer}>
                  // <Route path="/" component={All}>
const App = () =>
  <Router>
    <div>
      <Navbar />
      <Switch>

          <Route exact path="/" component={About} />
          <Route exact path="/challenges" component={Discover} />

            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/challenge/:id" component={Challenge} />
            <Route exact path="/login" component={Login} />

      </Switch>
      <Footer />
    </div>
  </Router>;

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


  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      auth.isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  );

  class Login extends React.Component {
    state = {
      redirectToReferrer: false
    }

    login = () => {
      auth.authenticate(() => {
        this.setState({ redirectToReferrer: true })
      })
    }

    render() {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const { redirectToReferrer } = this.state
      
      if (redirectToReferrer) {
        return (
          <Redirect to={from}/>
        )
      }
      
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
        </div>
      )
    };
  };

export default App;
