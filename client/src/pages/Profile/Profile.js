import React, { Component } from "react";
import API from "../../utils/API";
import ModalButton from "../../components/ModalButton/ModalButton.js";
import RecipeModal from "../../components/ModalButton/RecipeModal.js";
import Navbar from "../../components/Navbar";
import FileUpload from "../../components/FileUpload/FileUpload";

class Profile extends Component {
  state = {
    user: [],
    recipes: [],
    currentUser: "",
    bio: ""
  };

  componentDidMount() {
    this.loadProfile();
  };

  componentWillReceiveProps() {
    window.location.reload();
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
            user: res.data.results,
            recipes: "",
            bio: res.data.results.bio
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

  deletePic = id => {
    API.deletePic(id)
      .then(res => this.loadProfile())
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

                {this.state.currentUser === this.props.match.params.id ? (
                  <div className="row text-center">
                    <div className="col-sm-6">
                    {this.state.user.image ? (
                      <div>
                        <div className="show-image">
                          <img className="profileImage" src={this.state.user.image} />
                          <input onClick={() => this.deletePic(this.state.user.username)} className="btn delete" type="button" value="Delete" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <FileUpload
                        onDrop={FileUpload.bind(this)}
                        id={this.state.currentUser}
                        />
                      </div>
                    )}
                    </div>

                    <div className="col-sm-6">
                      <h1 className="display">{this.state.currentUser}</h1>
                      <ModalButton id={this.state.user._id} />
                      <span><a href="#">Posts</a> | <a href="#">Followers</a> | <a href="#">Following</a></span>
                      <br />
                      <h5>{this.state.bio}</h5>
                    </div>
                  </div>
                ) : (
                  <div className="row text-center">
                    <div className="col-sm-6">
                      <div className="show-image">
                        <img className="profileImage" src={this.state.user.image} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <h1 className="display">{this.props.match.params.id}</h1>
                      <div>
                        <button className="btn btn-primary">Follow</button>
                      </div>
                      <span><a href="#">Posts</a> | <a href="#">Followers</a> | <a href="#">Following</a></span>
                      <br />
                      <h5>{this.state.bio}</h5>
                    </div>
                  </div>
                )}

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
                    <button className="btn btn-danger" onClick={() => this.deleteRecipe(recipe._id)}>
                    Delete
                    </button>
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
