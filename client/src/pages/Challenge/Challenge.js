import React, { Component } from "react";
import API from "../../utils/API";
import RecipeModal from "../../components/ModalButton/RecipeModal.js";


class Challenge extends Component {

  state = {
    challenge: {},
    recipes: [],
    title: ""
  };

  componentDidMount() {
    API.getChallenge(this.props.match.params.id)
      .then(res => 
        this.setState({ challenge: res.data }),
        this.loadRecipes()
      )
    .catch(err => console.log(err));
  };

  loadRecipes = () => {
    API.getChallenge(this.props.match.params.id)
      .then(res =>
        this.setState({ 
          challenge: res.data,
          recipes: res.data.recipe, 
          title: ""
        })
      ).catch(err => console.log(err));
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
    console.log(this.state.challenge);
    console.log(this.state.challenge.title);
    console.log(this.state.challenge.image);
    console.log(this.state.challenge.ingredients);
    return (
      <div>
        <div className="container">
          <div className="jumbotron text-center">
            <h1>
              {this.state.challenge.title}
            </h1>
            <img width='500px' src={this.state.challenge.image} />
            <ul>
              {this.state.challenge.ingredients.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
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
