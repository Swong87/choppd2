import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  
  getRecipes: function() {
    return axios.get("/api/recipes/");
  },
 
  getRecipe: function(id) {
    return axios.get("/api/recipe/" + id);
  },

  deleteRecipe: function(id) {
    return axios.delete("/api/recipe/" + id);
  },

  saveRecipe: function(recipeData, id) {
    return axios.post("/api/recipe" + id, recipeData);
  },

  getChallenges: function() {
    return axios.get("/api/discover");
  },
 
  getChallenge: function(id) {
    return axios.get("/api/discover/" + id);
  },

  deleteChallenge: function(id) {
    return axios.delete("/api/challenge/" + id);
  },

  saveChallenge: function(challengeData) {
    return axios.post("/api/discover", challengeData);
  },
  getUsers: function() {
    return axios.get("/api/users");
  },
 
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },

  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },

  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  }
};