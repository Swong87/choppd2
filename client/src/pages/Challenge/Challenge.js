import React, { Component } from "react";
import API from "../../utils/API";
import RecipeModal from "../../components/ModalButton/RecipeModal.js";
import Navbar from "../../components/Navbar";

let ingredients = [];

class Challenge extends Component {

  state = {
    challenge: [],
    recipes: [],
    title: "",
    currentUser: ""
  };

  componentDidMount() {
    this.loadChallenge();
    this.loadRecipes();
  };

  loadChallenge = () => {
    API.getChallenge(this.props.match.params.id)
      .then(res => {
        if(res.data.statusCode == 401){
          this.props.history.push("/login");
        }
        else {
          console.log("user:", res.data.sess);
          this.setState({currentUser: res.data.sess.passport.user })
        }
        this.setState({ 
          challenge: res.data.results
        })
        ingredients = res.data.results.ingredients
      })
      .catch(err => console.log(err));
  };

  loadRecipes = () => {
    API.getChallenge(this.props.match.params.id)
      .then(res => {
        if (res.data.statusCode == 401) {
          this.props.history.push("/login");
        } else {
          this.setState({ 
            recipes: res.data.results.recipe,
            title: ""
          })
        }})
      .catch(err => console.log(err));
  };

  deleteRecipe = id => {
    API.deleteRecipe(id)
      .then(res => this.loadRecipes())
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
      API.saveRecipe({
        title: this.state.title
      }, this.props.match.params.id)
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Navbar userInfo={this.state.currentUser} />
        <div className="topPad container">
          <div className="jumbotron text-center">
            <h1>
              {this.state.challenge.title}
            </h1>
            <img width='500px' src={this.state.challenge.image} alt='challenge' />
          </div>
        </div>
        <div className="container text-center">
          <h3>Basket Ingredients</h3>
          {ingredients.length ? (
            <div>
              {ingredients.map((items, i) => (
                <li key={i}>
                  <strong>
                    {items}
                  </strong>
                </li>
              ))}
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
        <div className="bottomPad container text-center">
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
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
        <div className="container">
          {this.state.recipes.length ? (
            <ul>
              {this.state.recipes.map(recipe => (
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

export default Challenge;
