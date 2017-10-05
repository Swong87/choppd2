import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";


class Discover extends Component {

  state = {
    challenges: [],
    title: ""
  };

  componentDidMount() {
    this.loadChallenges();
  };

  loadChallenges = () => {
    API.getChallenges()
      .then(res =>
        this.setState({ 
          challenges: res.data, 
          title: ""
        })
      ).catch(err => console.log(err));
  };

  deleteChallenge = id => {
    API.deleteChallenge(id)
      .then(res => this.loadChallenges())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveChallenge({
        title: this.state.title
      })
        .then(res => this.loadChallenges())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <form>
            <div className="form-group">
              <input  
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
            
              <button 
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit} 
                className="btn btn-success"
              >
                Submit Challenge
              </button>
            </div>
          </form>
        </div>
        <div className="container">
          {this.state.challenges.length ? (
            <ul>
              {this.state.challenges.map(challenge => (
                <li key={challenge._id}>
                  <Link to={"/challenge/" + challenge._id}>
                    <strong>
                      {challenge.title}
                    </strong>
                  </Link>
                  <span className="btn" onClick={() => this.deleteChallenge(challenge._id)}>
                    ✗
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Discover;
