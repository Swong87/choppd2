import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";


class Discover extends Component {

  state = {
    challenges: [],
    title: "",
    image: "",
    ingredients: [],
    currentUser: ""
  };

  componentDidMount() {
    this.loadChallenges();
  };

  loadChallenges = () => {
    API.getChallenges()
      .then(res => {
        if(res.data.statusCode == 401){
          this.props.history.push("/login");
        }
        else {
          console.log("user:", res.data);
          this.setState({
            currentUser: res.data.sess.passport.user,
            challenges: res.data.results,
            title: "",
            image: ""
           })
        }
      }).catch(err => console.log(err));
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
        title: this.state.title,
        image: this.state.image,
        ingredients: this.state.ingredients.split(', ')
      })
        .then(res => this.loadChallenges())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Navbar userInfo={this.state.currentUser} />
        <div className="topPad container text-center">
          <form>
            <div className="form-group">
              <input  
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <input  
                value={this.state.image}
                onChange={this.handleInputChange}
                name="image"
                placeholder="Image URL"
              />
              <input  
                value={this.state.ingredients}
                onChange={this.handleInputChange}
                name="ingredients"
                placeholder="Ingredients (seperated by commas)"
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
            <div className="text-center">
              {this.state.challenges.map(challenge => (
                <div className="block" key={challenge._id}>
                  <div className="crop">
                    <Link to={"/challenge/" + challenge._id}>
                      <img className="imgBlock" src={challenge.image} alt='challenge' />
                      
                    </Link>
                  </div>
                  <div className="infoText">
                    <h4>{challenge.title}</h4>
                    {challenge.ingredients.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Discover;
