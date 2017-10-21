import React, { Component } from "react";
import API from "../../utils/API";
import RecipeModal from "../../components/ModalButton/RecipeModal.js";
import Navbar from "../../components/Navbar";
import AddRecipeModal from "../../components/ModalButton/AddRecipeModal.js";

let ingredients = [];



class Challenge extends Component {

  state = {
    challenge: [],
    recipes: [],
    title: "",
    currentUser: "",
    method: "",
    ingredients: [],
    image: ""
  };

  componentDidMount() {
    this.loadChallenge();
    this.loadRecipes();
  };

  componentWillUpdate() {
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
        title: this.state.title,
        user: this.state.currentUser,
        image: this.state.image,
        ingredients: this.state.ingredients.split(', '),
        method: this.state.method
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
          <div className="text-center">
            <h1 className="title">
              {this.state.challenge.title}
            </h1>
            <img className="challengeImgBlock" src={this.state.challenge.image} alt='challenge' />
          </div>
        </div>
        <div className="container text-center">
          <AddRecipeModal user={this.state.currentUser} id={this.props.match.params.id} />
          <br />
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
          
        </div>
        <div className="container text-center">
          {this.state.recipes.length ? (
            <ul>
              {this.state.recipes.map(recipe => (

                <div className="block" key={recipe._id}>
                  <div className="crop">
                    <span className="btn" onClick={() => this.deleteRecipe(recipe._id)}>
                    ✗
                    </span>
                    <RecipeModal id={recipe._id} src={recipe.image} />
                  </div>
                  <div className="infoText">
                    <h4>{recipe.title}</h4>
                    
                    <a href={'/profile/' + recipe.user}>{recipe.user}</a>
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

export default Challenge;
