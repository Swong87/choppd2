import React, { Component } from "react";
import API from "../../utils/API";
import ModalButton from "../../components/ModalButton/ModalButton.js";
import PicUploader from "../../components/PicUploader";
import RecipeModal from "../../components/ModalButton/RecipeModal.js";

let recipes = [];

class Profile extends Component {
  state = {
    user: []
  };

  componentDidMount() {
    this.loadProfile();
  };

  loadProfile = () => {
    API.getUser(this.props.match.params.id)
      .then(res => {
        console.log(res.data)
        this.setState({ 
          user: res.data
        })
        recipes = res.data.recipes
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getDogsOfBreed(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="text-center col-sm-3">
              <PicUploader />
              <img src="/profilePic.JPG" width="200px" alt="pic" />
            </div>
            <div className="text-center col-sm-9">

                <h1 className="display">SWong87</h1>
                <ModalButton />
                
                <span><a href="/search">Posts</a> | <a href="/search">Followers</a> | <a href="/search">Following</a></span>
                <p>Bio goes here</p>

            </div>
          </div>
        </div>

        <div className="container">
          {recipes.length ? (
            <ul>
              {recipes.map(recipe => (
                <li key={recipe._id}>
                  <strong>
                    {recipe.title}
                  </strong>
                  <RecipeModal />
                  <span className="btn" onClick={() => this.deleteRecipe(recipe._id)}>
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




export default Profile;
