import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  
  getRecipes: function() {
    return axios.get("/api/recipes");
  },
 
  getRecipe: function(id) {
    return axios.get("/api/recipes/" + id);
  },

  getUserRecipes: function(id) {
    return axios.get("/api/byuser/" + id);
  },

  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },

  saveRecipe: function(recipeData, id) {
    return axios.post("/api/recipes/" + id, recipeData);
  },

  getChallenges: function() {
    return axios.get("/api/challenges");
  },
 
  getChallenge: function(id) {
    return axios.get("/api/challenges/" + id);
  },

  deleteChallenge: function(id) {
    return axios.delete("/api/challenges/" + id);
  },

  saveChallenge: function(challengeData) {
    return axios.post("/api/challenges", challengeData);
  },
  updateChallenge: function(id) {
    return axios.put("/api/challenges/" + id);
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  login: function(userData) {
    return axios.post("/api/auth/login", userData);
  },
  logout: function() {
    return axios.get("/api/auth/logout");
  },
  register: function(userData) {
    return axios.post("/api/auth/register", userData);
  },
};