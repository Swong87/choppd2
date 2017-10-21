import React, { Component } from "react";
import API from "../../utils/API";
import ModalButton from "../../components/ModalButton/ModalButton.js";
import RecipeModal from "../../components/ModalButton/RecipeModal.js";
import Navbar from "../../components/Navbar";

class Profile extends Component {
  state = {
    user: [],
    recipes: [],
    currentUser: ""
  };

  componentDidMount() {
    this.loadProfile();
  };

  componentWillReceiveProps() {
    this.loadProfile();
  };

  loadProfile = () => {
    API.getUser(this.props.match.params.id)
      .then(res => {
        if (res.data.statusCode == 401) {
          this.props.history.push("/login");
        } else {
          this.setState({ 
            currentUser: res.data.sess.passport.user,
            user: res.data.results
          })
          this.loadRecipes();
        }
      })
      .catch(err => console.log(err));
  };

  loadRecipes = () => {
    API.getUserRecipes(this.props.match.params.id)
      .then(res => {
        if (res.data.statusCode == 401) {
          this.props.history.push("/login");
        } else {
          this.setState({ 
            recipes: res.data.results
          })
          // console.log("Results:" + res.data.results);
        }})
      .catch(err => console.log(err));
  };

  deleteRecipe = id => {
    API.deleteRecipe(id)
      .then(res => this.loadRecipes())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    return (
      <div>
        <Navbar userInfo={this.state.currentUser} />
        <div className="topPad bottomPad container">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <div className="row text-center">
                <div className="col-sm-6">
                </div>
                <div className="col-sm-6">
                  {this.state.currentUser === this.props.match.params.id ? (
                    <div>
                      <h1 className="display">{this.state.currentUser}</h1>
                      <ModalButton id={this.state.user._id} />
                      <span><a href="#">Posts</a> | <a href="#">Followers</a> | <a href="#">Following</a></span>
                      <h5>{this.state.user.bio}</h5>
                    </div>
                  ) : (
                    <div>
                      <h1 className="display">{this.props.match.params.id}</h1>
                      <div>
                        <button className="btn btn-primary">Follow</button>
                      </div>
                      <span><a href="#">Posts</a> | <a href="#">Followers</a> | <a href="#">Following</a></span>
                      <p>{this.state.user.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>
        <div className="container text-center">
          {this.state.recipes.length ? (
            <ul>
              {this.state.recipes.map(recipe => (

                <div className="block" key={recipe._id}>
                  <div className="crop">
                    <RecipeModal id={recipe._id} src={recipe.image} />
                  </div>
                  <div className="infoText">
                    <h4>{recipe.title}</h4>
                    <span className="btn" onClick={() => this.deleteRecipe(recipe._id)}>
                    ✗
                    </span>
                  </div>
                </div>
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




export default Profile;
