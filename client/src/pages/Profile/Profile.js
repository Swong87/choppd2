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

  render() {
    return (
      <div>
        <div className="topPad bottomPad container">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <div className="row text-center">
                <div className="col-sm-6">
                  <PicUploader />
                </div>
                <div className="col-sm-6">

                    <h1 className="display">{this.state.user.username}</h1>
                    <ModalButton />
                    
                    <span><a href="/search">Posts</a> | <a href="/search">Followers</a> | <a href="/search">Following</a></span>
                    <p>Bio goes here</p>

                </div>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>

        <div className="container text-center">
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
